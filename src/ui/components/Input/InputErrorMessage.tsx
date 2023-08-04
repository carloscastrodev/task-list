interface InputErrorMessageProps {
  message?: string;
}

export function InputErrorMessage({
  message = 'Please type something before submitting.',
}: InputErrorMessageProps) {
  return <p className="text-xs italic text-red-600">{message}</p>;
}
