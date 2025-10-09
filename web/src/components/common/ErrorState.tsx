export default function ErrorState({ message="Something went wrong" }: { message?: string }) {
  return <div className="p-8 text-red-600">{message}</div>;
}
