import { IconButton } from '@/ui/components/Button';
import CheckIcon from '@/assets/icons/check.svg';

interface TasksMarkAsDoneButtonProps {
  onClick: () => void;
}

export function TasksMarkAsDoneButton({ onClick }: TasksMarkAsDoneButtonProps) {
  return (
    <IconButton
      title="Mark as done"
      iconSource={CheckIcon}
      alt="check icon"
      aria-label="Done"
      onClick={onClick}
    />
  );
}
