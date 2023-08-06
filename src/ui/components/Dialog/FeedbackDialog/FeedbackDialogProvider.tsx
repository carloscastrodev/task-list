import FeedbackDialog from '@/ui/components/Dialog/FeedbackDialog';
import { useState } from 'react';
import context from './FeedbackDialogContext';
import constants from '@/constants';

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
        showFeedback: (feedback) =>
          setFeedbackMessage(feedback || constants.DEFAULT_FEEDBACK_MESSAGE),
      }}
    >
      {children}

      {feedbackMessage ? (
        <FeedbackDialog message={feedbackMessage} onClose={onClose} />
      ) : null}
    </Provider>
  );
}
