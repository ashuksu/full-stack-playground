'use client';

import { useState } from 'react';
import { Button } from './button';

type CounterProps = {
  initialValue: number;
};

export function Counter({ initialValue }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return <Button onClick={() => setCount((value) => value + 1)}>Count: {count}</Button>;
}
