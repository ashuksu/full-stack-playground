type ProjectFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ProjectFilter({ value, onChange }: ProjectFilterProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Filter projects..."
    />
  );
}
