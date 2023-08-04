interface EmptyStateMessageProps {
  text: string;
}

function EmptyStateMessage({ text }: EmptyStateMessageProps) {
  return <p className="text-center">{text}</p>;
}

export default EmptyStateMessage;
