// http://localhost:3000/stream/test-room
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

const StreamStage = () => {
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare], {
    onlySubscribed: true,
  });

  if (tracks.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
        Ожидание начала трансляции...
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

interface StreamRoomProps {
  roomId: string;
  username: string;
  isPublisher: boolean;
}

export const StreamRoom = ({ roomId, username, isPublisher }: StreamRoomProps) => {
  const [token, setToken] = useState<string>('');
  const [wsUrl, setWsUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLiveKitToken(roomId, username, isPublisher)
      .then((data) => {
        setToken(data.token);
        setWsUrl(data.wsUrl);
      })
      .catch((err) => setError(err.message));
  }, [roomId, username, isPublisher]);

  if (error) return <div className="p-4 text-red-500">Ошибка: {error}</div>;
  if (!token || !wsUrl) return <div className="p-4">Загрузка токена стрима...</div>;

  return (
    <LiveKitRoom
      video={isPublisher}
      audio={isPublisher}
      token={token}
      serverUrl={wsUrl}
      data-lk-theme="default"
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <div className="grid h-full grid-cols-1 gap-4 p-4 lg:grid-cols-4">
        {/* Video zone */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-black lg:col-span-3">
          <StreamStage />
          <RoomAudioRenderer />

          {/* Camera/microphone enable control for streamer only */}
          {isPublisher && (
            <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
              <ControlBar controls={{ chat: false, settings: false }} />
            </div>
          )}
        </div>

        {/* Chat directly from LiveKit Data Channels */}
        <div className="border-border h-full overflow-hidden rounded-lg border lg:col-span-1">
          <Chat />
        </div>
      </div>
    </LiveKitRoom>
  );
};
