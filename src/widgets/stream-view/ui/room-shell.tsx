'use client';

import type { ReactNode } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import type { StreamMode } from '@/shared/config/livekit';
import { Skeleton } from '@/shared/ui/skeleton';
import { useLiveKitToken } from '../model/use-livekit-token';

interface RoomShellProps {
  mode: StreamMode;
  roomId: string;
  isPublisher?: boolean;
  children: ReactNode;
}

const ROOM_HEIGHT = 'h-[calc(100dvh-9rem)]';

/** Single place for token loading, error states and LiveKitRoom setup. */
export function RoomShell({ mode, roomId, isPublisher = true, children }: RoomShellProps) {
  const { data, error, isPending } = useLiveKitToken({ mode, roomId, isPublisher });

  if (error) {
    return (
      <div role="alert" className="text-destructive p-4">
        Error: {error.message}
      </div>
    );
  }

  if (isPending || !data) return <Skeleton className={`${ROOM_HEIGHT} w-full rounded-lg`} />;

  return (
    <LiveKitRoom
      token={data.token}
      serverUrl={data.wsUrl}
      video={isPublisher}
      audio={isPublisher}
      connect
      data-lk-theme="default"
      className={ROOM_HEIGHT}
    >
      {children}
    </LiveKitRoom>
  );
}
