export async function getLiveKitToken(room: string, username: string, isPublisher: boolean) {
  const res = await fetch(
    `/api/livekit-token?room=${encodeURIComponent(room)}&username=${encodeURIComponent(username)}&publisher=${isPublisher}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch LiveKit token');
  }

  return res.json() as Promise<{ token: string; wsUrl: string }>;
}
