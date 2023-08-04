import { Task } from '@/types/task';
import { Dialog } from '@/ui/components/Dialog';
import { DialogActionsProps } from '@/ui/components/Dialog/DialogActions';

type DeleteTaskDialogProps = DialogActionsProps & {
  task: Task;
};

function DeleteTaskDialog({ onClose, onSubmit, task }: DeleteTaskDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Overlay />
      <Dialog.Body>
        <h3 className="mb-2 text-lg">
          Press submit to confirm deletion of{' '}
          {task.parentTaskId ? 'subtask' : 'task'} {task.description}
        </h3>
        <div className="mt-2">
          <Dialog.Actions
            onClose={onClose}
            showSubmit
            onSubmit={onSubmit}
            submitButtonVariant="danger"
            submitButtonType="button"
          />
        </div>
      </Dialog.Body>
    </Dialog.Root>
  );
}

export default DeleteTaskDialog;
