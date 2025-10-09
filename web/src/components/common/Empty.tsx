export default function Empty({ text="No data" }: { text?: string }) {
  return <div className="p-8 opacity-70">{text}</div>;
}
