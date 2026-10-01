import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';
import { isStreamMode, MAX_PARTICIPANTS, toLiveKitRoomName } from '@/shared/config/livekit';

const ID_PATTERN = /^[\w-]{1,64}$/;

interface TokenRequestBody {
  mode?: unknown;
  roomId?: unknown;
  username?: unknown;
  publisher?: unknown;
}

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as TokenRequestBody | null;
  const { mode, roomId, username, publisher } = body ?? {};

  if (!isStreamMode(mode)) return json({ error: 'Invalid "mode"' }, 400);
  if (typeof roomId !== 'string' || !ID_PATTERN.test(roomId)) {
    return json({ error: 'Invalid "roomId"' }, 400);
  }
  if (typeof username !== 'string' || !ID_PATTERN.test(username)) {
    return json({ error: 'Invalid "username"' }, 400);
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return json({ error: 'LiveKit server misconfigured' }, 500);
  }

  const roomName = toLiveKitRoomName(mode, roomId);
  const maxParticipants = MAX_PARTICIPANTS[mode];

  try {
    const rooms = new RoomServiceClient(wsUrl.replace(/^ws/, 'http'), apiKey, apiSecret);

    await rooms.createRoom({ name: roomName, maxParticipants, emptyTimeout: 60 });

    const participants = await rooms.listParticipants(roomName);
    const isRejoin = participants.some((p) => p.identity === username);
    if (!isRejoin && participants.length >= maxParticipants) {
      return json({ error: 'Room is full' }, 409);
    }
  } catch {
    return json({ error: 'LiveKit room service unavailable' }, 502);
  }

  const canPublish = mode === 'broadcast' ? publisher === true : true;

  const at = new AccessToken(apiKey, apiSecret, { identity: username, ttl: '10m' });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canSubscribe: true,
    canPublish,
    canPublishData: true,
  });

  return json({ token: await at.toJwt(), wsUrl });
}
