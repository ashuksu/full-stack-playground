'use client';

import { use, useState } from 'react';
import { BroadcastStreamRoom } from '@/widgets/stream-view';
import { Card, CardContent } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { Badge } from '@/shared/ui/badge';

export default function BroadcastPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;

  const [username] = useState(() => 'User_' + Math.floor(Math.random() * 1000));
  const [isPublisher, setIsPublisher] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="p-3">
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-2">
            <Badge variant="default">Broadcast Mode (1 to N)</Badge>
            <span className="text-muted-foreground text-sm font-medium">Room: {roomId}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="publisher-mode" checked={isPublisher} onCheckedChange={setIsPublisher} />
            <Label htmlFor="publisher-mode" className="cursor-pointer font-medium">
              I&apos;m a Streamer
            </Label>
          </div>
        </CardContent>
      </Card>

      <BroadcastStreamRoom roomId={roomId} username={username} isPublisher={isPublisher} />
    </div>
  );
}
