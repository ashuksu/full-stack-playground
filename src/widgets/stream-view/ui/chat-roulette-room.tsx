'use client';

import {
  Chat,
  ControlBar,
  RoomAudioRenderer,
  useTracks,
  VideoTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { RoomHeader } from './room-header';
import { RoomShell } from './room-shell';

import styles from './chat.module.css';

const DuelStage = () => {
  const cameraTracks = useTracks([Track.Source.Camera], { onlySubscribed: false }).slice(0, 2);

  if (cameraTracks.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
        Waiting for participants to connect...
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-1 gap-2 bg-black p-2 md:grid-cols-2">
      {cameraTracks.map((track) => (
        <div
          key={track.participant.identity}
          className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
        >
          <VideoTrack trackRef={track} className="h-full w-full object-cover" />
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/60 backdrop-blur">
              {track.participant.identity}
            </Badge>
          </div>
        </div>
      ))}

      {cameraTracks.length === 1 && (
        <div className="text-muted-foreground flex h-full w-full items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900 text-sm">
          Searching for a peer...
        </div>
      )}
    </div>
  );
};

export const ChatRouletteRoom = ({ roomId }: { roomId: string }) => (
  <section className="flex flex-col gap-4 p-4">
    <RoomHeader title="Chat Roulette Mode (1 on 1)" roomId={roomId} />

    <RoomShell mode="roulette" roomId={roomId}>
      <div className="grid h-full grid-cols-1 items-start gap-4 lg:grid-cols-4">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-black lg:col-span-3">
          <DuelStage />
          <RoomAudioRenderer />
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
            <ControlBar controls={{ chat: false, settings: false }} />
          </div>
        </div>

        <Card className="flex h-full flex-col gap-0 overflow-hidden p-0">
          <div className={`${styles.chat} flex-1 overflow-hidden`}>
            <Chat />
          </div>
        </Card>
      </div>
    </RoomShell>
  </section>
);
