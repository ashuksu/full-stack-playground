import type { ReactNode } from 'react';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';

interface RoomHeaderProps {
  title: string;
  roomId: string;
  children?: ReactNode;
}

export function RoomHeader({ title, roomId, children }: RoomHeaderProps) {
  return (
    <Card className="p-3">
      <CardContent className="flex items-center justify-between p-0">
        <div className="flex items-center gap-2">
          <Badge variant="default">{title}</Badge>
          <span className="text-muted-foreground text-sm font-medium">Room: {roomId}</span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
