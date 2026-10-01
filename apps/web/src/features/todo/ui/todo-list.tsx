'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

type Todo = { id: number; title: string };

export function TodoList() {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');

  const { data, isPending, error } = useQuery({
    queryKey: ['todo'],
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch('/api/todo');

      if (!res.ok) throw new Error('Failed to load');

      return res.json();
    },
  });

  const add = useMutation({
    mutationFn: (title: string) =>
      fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      }).then((r) => r.json()),
    onSuccess: () => {
      setTitle('');
      qc.invalidateQueries({ queryKey: ['todo'] });
    },
  });

  if (isPending) return <p>Loading…</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col gap-3">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button disabled={add.isPending || !title} onClick={() => add.mutate(title)}>
        Add
      </Button>
      <ul>
        {data.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
