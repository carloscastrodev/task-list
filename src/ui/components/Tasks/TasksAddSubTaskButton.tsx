import { PrimaryButton } from '@/ui/components/Button';

interface TasksAddSubtaskButtonProps {
  onClick: () => void;
}

export function TasksAddSubtaskButton({ onClick }: TasksAddSubtaskButtonProps) {
  return <PrimaryButton onClick={onClick}>Add Subtask</PrimaryButton>;
}
