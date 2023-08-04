import React from 'react';
import { createPortal } from 'react-dom';
interface DialogRootProps {
  children: React.ReactNode;
}

export function DialogRoot({ children }: DialogRootProps) {
  return createPortal(
    <div
      tabIndex={-1}
      aria-roledescription="dialog"
      role="dialog"
      className="align-center fade-in fixed left-0 top-0 z-10 flex h-screen w-screen flex-col justify-center"
    >
      {children}
    </div>,
    document.getElementById('dialog-root')!
  );
}
