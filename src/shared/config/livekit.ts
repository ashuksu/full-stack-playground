export const STREAM_MODES = ['broadcast', 'roulette', 'conference'] as const;
export type StreamMode = (typeof STREAM_MODES)[number];

/** Hard participant caps enforced server-side by LiveKit (maxParticipants). */
export const MAX_PARTICIPANTS: Record<StreamMode, number> = {
  broadcast: 500,
  roulette: 2,
  conference: 20,
};

export const isStreamMode = (value: unknown): value is StreamMode =>
  STREAM_MODES.includes(value as StreamMode);

export const toLiveKitRoomName = (mode: StreamMode, roomId: string) => `${mode}__${roomId}`;
