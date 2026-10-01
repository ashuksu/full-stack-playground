import type { StreamMode } from '@/shared/config/livekit';

export interface LiveKitTokenParams {
  mode: StreamMode;
  roomId: string;
  username: string;
  publisher: boolean;
}

export interface LiveKitTokenResponse {
  token: string;
  wsUrl: string;
}

export async function getLiveKitToken(
  params: LiveKitTokenParams,
  signal?: AbortSignal,
): Promise<LiveKitTokenResponse> {
  const res = await fetch('/api/livekit-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    signal,
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? 'Failed to fetch LiveKit token');
  }

  return res.json();
}
