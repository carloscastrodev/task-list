import {
  OutlineButton,
  PrimaryButton,
  DangerButton,
} from '@/ui/components/Button';

type DialogActionSubmitButtonVariants = 'success' | 'danger';
export interface DialogActionsProps {
  submitButtonVariant?: DialogActionSubmitButtonVariants;
  onClose: () => void;
  onSubmit?: () => void;
  showSubmit?: boolean;
  submitButtonType?: 'submit' | 'button';
}

export function DialogActions({
  onClose,
  onSubmit,
  showSubmit,
  submitButtonVariant = 'success',
  submitButtonType = 'submit',
}: DialogActionsProps) {
  const submitButtonVariants: Record<
    DialogActionSubmitButtonVariants,
    React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
  > = {
    success: PrimaryButton,
    danger: DangerButton,
  };

  const SubmitButton = submitButtonVariants[submitButtonVariant];

  return (
    <div className="flex justify-end gap-4">
      {showSubmit ? (
        <SubmitButton type={submitButtonType} onClick={onSubmit}>
          Submit
        </SubmitButton>
      ) : null}

      <OutlineButton onClick={onClose}>Close</OutlineButton>
    </div>
  );
}
