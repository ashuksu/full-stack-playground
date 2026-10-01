'use client';

import { useEffect, useState } from 'react';
import {
  Chat,
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useParticipants,
  useTracks,
  VideoTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { getLiveKitToken } from '@/shared/api/livekit';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';

const Stage = () => {
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare], {
    onlySubscribed: true,
  });

  if (tracks.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
        Streamer has not started broadcasting yet...
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      {tracks.map((track) => (
        <VideoTrack
          key={track.publication.trackSid}
          trackRef={track}
          className="h-full w-full object-contain"
        />
      ))}
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
            key={p.sid}
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

interface BroadcastStreamRoomProps {
  roomId: string;
  username: string;
  isPublisher: boolean;
}

export const BroadcastStreamRoom = ({
  roomId,
  username,
  isPublisher,
}: BroadcastStreamRoomProps) => {
  const [token, setToken] = useState('');
  const [wsUrl, setWsUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLiveKitToken(roomId, username, isPublisher)
      .then((data) => {
        setToken(data.token);
        setWsUrl(data.wsUrl);
      })
      .catch((err) => setError(err.message));
  }, [roomId, username, isPublisher]);

  if (error) return <div className="text-destructive p-4">Error: {error}</div>;
  if (!token || !wsUrl)
    return <div className="text-muted-foreground p-4">Loading broadcast token...</div>;

  return (
    <LiveKitRoom
      video={isPublisher}
      audio={isPublisher}
      token={token}
      serverUrl={wsUrl}
      data-lk-theme="default"
      style={{ height: 'calc(100vh - 140px)' }}
    >
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
    </LiveKitRoom>
  );
};
