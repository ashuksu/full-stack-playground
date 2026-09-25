'use client';

import { useState } from 'react';

type ProjectFilterProps = {
  onChange: (value: string) => void;
};

export function ProjectFilter({ onChange }: ProjectFilterProps) {
  const [value, setValue] = useState('');

  function handleChange(value: string) {
    setValue(value);
    onChange(value);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      placeholder="Filter projects..."
    />
  );
}
