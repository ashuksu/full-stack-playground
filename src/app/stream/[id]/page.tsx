'use client';

import { use, useState } from 'react';
import { StreamRoom } from '@/widgets/stream-view/ui/stream-room';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export default function StreamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params);

  const [username, setUsername] = useState('');
  const [isPublisher, setIsPublisher] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  if (!isJoined) {
    return (
      <div className="mx-auto mt-20 max-w-md space-y-4 rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-bold">Connect to stream: {roomId}</h1>

        <div>
          <label className="text-sm font-medium">Your name:</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nickname"
            className="mt-1"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={() => {
              setIsPublisher(true);
              setIsJoined(true);
            }}
            disabled={!username.trim()}
          >
            Login as Streamer (Camera + Microphone)
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsPublisher(false);
              setIsJoined(true);
            }}
            disabled={!username.trim()}
          >
            Login as Viewer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="font-semibold">
          Stream: {roomId} | You: {username} ({isPublisher ? 'are the Streamer' : 'are a Viewer'})
        </h1>
        <Button variant="destructive" size="sm" onClick={() => setIsJoined(false)}>
          Viewer
        </Button>
      </div>

      <StreamRoom roomId={roomId} username={username} isPublisher={isPublisher} />
    </div>
  );
}
