'use client';

import { useQuery } from '@tanstack/react-query';

export function UserInfo() {
  const { data, isPending, error } = useQuery({
    queryKey: ['user', 1],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>{data.name}</div>;
}
