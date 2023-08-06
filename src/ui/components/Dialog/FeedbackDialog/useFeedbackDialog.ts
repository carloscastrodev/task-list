import { useContext } from 'react';
import context from './FeedbackDialogContext';

export function useFeedbackDialog() {
  const { feedback, showFeedback, onClose } = useContext(context);

  return {
    feedback,
    showFeedback,
    onClose,
  };
}
