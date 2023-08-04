import { IconButton } from '@/ui/components/Button';
import CloseIcon from '@/assets/icons/close.svg';

interface TasksDeleteButtonProps {
  onClick: () => void;
}

export function TasksDeleteButton({ onClick }: TasksDeleteButtonProps) {
  return (
    <IconButton
      title="Delete task"
      iconSource={CloseIcon}
      alt="x icon"
      aria-label="Delete"
      onClick={onClick}
    />
  );
}
