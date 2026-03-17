export function ColorCircle({ code, name }: { name: string; code: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="size-4 rounded-full" style={{ backgroundColor: code }} />
      {name}
    </span>
  );
}
