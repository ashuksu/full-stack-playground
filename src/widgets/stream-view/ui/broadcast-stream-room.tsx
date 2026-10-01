'use client';

import { useState } from 'react';
import {
  Chat,
  ControlBar,
  RoomAudioRenderer,
  useParticipants,
  useTracks,
  VideoTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { RoomHeader } from './room-header';
import { RoomShell } from './room-shell';

const Stage = () => {
  const tracks = useTracks([Track.Source.ScreenShare, Track.Source.Camera], {
    onlySubscribed: true,
  });

  const main = tracks.find((t) => t.source === Track.Source.ScreenShare) ?? tracks[0];

  if (!main) {
    return (
      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
        Streamer has not started broadcasting yet...
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      <VideoTrack trackRef={main} className="h-full w-full object-contain" />
    </div>
  );
};

const ParticipantList = () => {
  const participants = useParticipants();

  return (
    <div className="border-border flex flex-col gap-2 border-b p-3">
      <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
        <span>Viewers Online</span>
        <Badge variant="secondary">{participants.length}</Badge>
      </div>
      <div className="max-h-40 space-y-1 overflow-y-auto">
        {participants.map((p) => (
          <div
            key={p.identity}
            className="bg-muted/50 flex items-center justify-between rounded px-2 py-1 text-sm"
          >
            <span className="truncate">{p.identity}</span>
            {p.isSpeaking && <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export const BroadcastStreamRoom = ({ roomId }: { roomId: string }) => {
  const [isPublisher, setIsPublisher] = useState(true);

  return (
    <section className="flex flex-col gap-4 p-4">
      <RoomHeader title="Broadcast Mode (1 to N)" roomId={roomId}>
        <div className="flex items-center space-x-2">
          <Switch id="publisher-mode" checked={isPublisher} onCheckedChange={setIsPublisher} />
          <Label htmlFor="publisher-mode" className="cursor-pointer font-medium">
            I&apos;m a Streamer
          </Label>
        </div>
      </RoomHeader>

      <RoomShell mode="broadcast" roomId={roomId} isPublisher={isPublisher}>
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-black lg:col-span-3">
            <Stage />
            <RoomAudioRenderer />
            {isPublisher && (
              <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                <ControlBar controls={{ chat: false, settings: false }} />
              </div>
            )}
          </div>

          <Card className="flex h-full flex-col gap-0 overflow-hidden p-0">
            <ParticipantList />
            <div className="flex-1 overflow-hidden">
              <Chat />
            </div>
          </Card>
        </div>
      </RoomShell>
    </section>
  );
};
