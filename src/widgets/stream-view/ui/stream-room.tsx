'use client';

import { useEffect, useState } from 'react';
import { Chat, LiveKitRoom, RoomAudioRenderer, VideoConference } from '@livekit/components-react';
import { getLiveKitToken } from '@/shared/api/livekit';

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
          <VideoConference />
          <RoomAudioRenderer />
        </div>

        {/* Chat directly from LiveKit Data Channels */}
        <div className="border-border h-full overflow-hidden rounded-lg border lg:col-span-1">
          <Chat />
        </div>
      </div>
    </LiveKitRoom>
  );
};
