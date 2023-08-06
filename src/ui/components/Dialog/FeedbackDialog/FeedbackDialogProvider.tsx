import FeedbackDialog from '@/ui/components/Dialog/FeedbackDialog';
import { useState } from 'react';
import context from './FeedbackDialogContext';

const Provider = context.Provider;

export default function FeedbackDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>();

  const onClose = () => setFeedbackMessage(undefined);

  return (
    <Provider
      value={{
        feedback: feedbackMessage,
        onClose,
        showFeedback: setFeedbackMessage,
      }}
    >
      {children}

      {feedbackMessage ? (
        <FeedbackDialog message={feedbackMessage} onClose={onClose} />
      ) : null}
    </Provider>
  );
}
