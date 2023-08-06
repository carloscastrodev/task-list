import { createContext } from 'react';

interface FeedbackDialogContext {
  feedback?: string;
  onClose: () => void;
  showFeedback: (feedback?: string) => void;
}

export default createContext<FeedbackDialogContext>(
  {} as FeedbackDialogContext
);
