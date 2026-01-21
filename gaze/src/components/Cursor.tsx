interface CursorProps {
  x: number;
  y: number;
}

export default function Cursor({ x, y }: CursorProps) {
  return (
    <div
      className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}