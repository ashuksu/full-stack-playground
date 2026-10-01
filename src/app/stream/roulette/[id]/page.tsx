'use client';

import { use, useState } from 'react';
import { ChatRouletteRoom } from '@/widgets/stream-view';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

export default function RoulettePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;

  const [username] = useState(() => 'User_' + Math.floor(Math.random() * 1000));

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="p-3">
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-2">
            <Badge variant="default">Chat Roulette Mode (1 on 1)</Badge>
            <span className="text-muted-foreground text-sm font-medium">Room: {roomId}</span>
          </div>
        </CardContent>
      </Card>

      <ChatRouletteRoom roomId={roomId} username={username} />
    </div>
  );
}
