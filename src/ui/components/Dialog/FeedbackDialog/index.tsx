import { Dialog } from '@/ui/components/Dialog';
import { DialogActionsProps } from '@/ui/components/Dialog/DialogActions';

type FeedbackDialogProps = DialogActionsProps & {
  message: string;
};

function FeedbackDialog({ onClose, message }: FeedbackDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Overlay />
      <Dialog.Body>
        <p className="mb-2 text-sm">{message}</p>

        <div className="mt-2">
          <Dialog.Actions onClose={onClose} />
        </div>
      </Dialog.Body>
    </Dialog.Root>
  );
}

export default FeedbackDialog;
