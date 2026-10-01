'use client';

import { VideoConference } from '@livekit/components-react';
import { RoomHeader } from './room-header';
import { RoomShell } from './room-shell';

export const ConferenceRoom = ({ roomId }: { roomId: string }) => (
  <section className="flex flex-col gap-4 p-4">
    <RoomHeader title="Conference Mode (Google Meet)" roomId={roomId} />
    <RoomShell mode="conference" roomId={roomId}>
      <VideoConference />
    </RoomShell>
  </section>
);
