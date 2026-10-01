'use client';

import { useEffect, useState } from 'react';
import {
  Chat,
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useTracks,
  VideoTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { getLiveKitToken } from '@/shared/api/livekit';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';

const DuelStage = () => {
  const cameraTracks = useTracks([Track.Source.Camera], {
    onlySubscribed: false,
  });

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
          key={track.publication.trackSid || track.participant.identity}
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
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

interface ChatRouletteRoomProps {
  roomId: string;
  username: string;
}

export const ChatRouletteRoom = ({ roomId, username }: ChatRouletteRoomProps) => {
  const [token, setToken] = useState('');
  const [wsUrl, setWsUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLiveKitToken(roomId, username, true)
      .then((data) => {
        setToken(data.token);
        setWsUrl(data.wsUrl);
      })
      .catch((err) => setError(err.message));
  }, [roomId, username]);

  if (error) return <div className="text-destructive p-4">Error: {error}</div>;
  if (!token || !wsUrl)
    return <div className="text-muted-foreground p-4">Connecting to 1x1 room...</div>;

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={wsUrl}
      data-lk-theme="default"
      style={{ height: 'calc(100vh - 140px)' }}
    >
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-black lg:col-span-3">
          <DuelStage />
          <RoomAudioRenderer />

          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
            <ControlBar controls={{ chat: false, settings: false }} />
          </div>
        </div>

        <Card className="flex h-full flex-col gap-0 overflow-hidden p-0">
          <div className="flex-1 overflow-hidden">
            <Chat />
          </div>
        </Card>
      </div>
    </LiveKitRoom>
  );
};
