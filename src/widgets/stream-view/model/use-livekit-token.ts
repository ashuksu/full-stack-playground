'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLiveKitToken } from '@/shared/api/livekit';
import type { StreamMode } from '@/shared/config/livekit';

interface UseLiveKitTokenParams {
  mode: StreamMode;
  roomId: string;
  isPublisher: boolean;
}

export function useLiveKitToken({ mode, roomId, isPublisher }: UseLiveKitTokenParams) {
  const [username] = useState(() => `user_${crypto.randomUUID().slice(0, 8)}`);

  return useQuery({
    queryKey: ['livekit-token', mode, roomId, username, isPublisher],
    queryFn: ({ signal }) =>
      getLiveKitToken({ mode, roomId, username, publisher: isPublisher }, signal),
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
