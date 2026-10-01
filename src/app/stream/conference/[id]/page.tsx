'use client';

import { use, useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { getLiveKitToken } from '@/shared/api/livekit';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

export default function ConferencePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;

  const [username] = useState(() => 'User_' + Math.floor(Math.random() * 1000));
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
    return <div className="text-muted-foreground p-4">Loading conference token...</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="p-3">
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-2">
            <Badge variant="default">Conference Mode (Google Meet)</Badge>
            <span className="text-muted-foreground text-sm font-medium">Room: {roomId}</span>
          </div>
        </CardContent>
      </Card>

      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={wsUrl}
        data-lk-theme="default"
        style={{ height: 'calc(100vh - 140px)' }}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}
