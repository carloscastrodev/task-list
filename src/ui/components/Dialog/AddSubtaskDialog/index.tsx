import { useRef, useState } from 'react';
import { Dialog } from '@/ui/components/Dialog';
import { InputErrorMessage, InputText } from '@/ui/components/Input';
import { DialogActionsProps } from '@/ui/components/Dialog/DialogActions';
import { Task } from '@/types/task';

type AddSubtaskDialogProps = Pick<DialogActionsProps, 'onClose'> & {
  task: Task;
  onSubmit: (description: string) => void;
};

function AddSubtaskDialog({ task, onClose, onSubmit }: AddSubtaskDialogProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isErrored, setIsErrored] = useState(false);

  const _onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    const value = ref.current?.value;
    if (!value) {
      setIsErrored(true);
    } else {
      setIsErrored(false);
      onSubmit(value);
      ref.current!.value = '';
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Overlay />
      <Dialog.Body>
        <h3 className="mb-2 text-lg">
          Add subtask to task <strong>{task.description}</strong>
        </h3>
        <div className="w-[300px] max-w-[90vw]">
          <form onSubmit={_onSubmit}>
            <InputText
              ref={ref}
              placeholder="Type in to add a new subtask..."
              autoFocus
              isErrored={isErrored}
            />

            {isErrored && <InputErrorMessage />}

            <div className="mt-2">
              <Dialog.Actions onClose={onClose} showSubmit />
            </div>
          </form>
        </div>
      </Dialog.Body>
    </Dialog.Root>
  );
}

export default AddSubtaskDialog;
