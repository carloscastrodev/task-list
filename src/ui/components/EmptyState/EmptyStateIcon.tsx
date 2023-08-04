import ExclamationIcon from '@/assets/icons/exclamation.svg';

function EmptyStateIcon() {
  return (
    <img
      src={ExclamationIcon}
      alt="Attention"
      aria-hidden={true}
      className="h-12 w-12"
    />
  );
}

export default EmptyStateIcon;
