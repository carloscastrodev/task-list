import { OutlineButton } from '@/ui/components/Button';

interface EmptyStateCTAProps {
  text: string;
  action: () => void;
  disabled?: boolean;
}

function EmptyStateCTA({ text, action, disabled }: EmptyStateCTAProps) {
  return (
    <OutlineButton onClick={action} disabled={disabled}>
      {text}
    </OutlineButton>
  );
}

export default EmptyStateCTA;
