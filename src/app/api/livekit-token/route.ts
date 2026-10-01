import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');
  const username = searchParams.get('username') || `user_${Math.floor(Math.random() * 1000)}`;
  const isPublisher = searchParams.get('publisher') === 'true';

  if (!room) {
    return NextResponse.json({ error: 'Missing "room" parameter' }, { status: 400 });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: 'LiveKit server misconfigured' }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: username,
  });

  at.addGrant({
    roomJoin: true,
    room,
    canPublish: isPublisher, // true — streamer, false — viewer
    canSubscribe: true,
  });

  const token = await at.toJwt();

  return NextResponse.json({ token, wsUrl });
}
