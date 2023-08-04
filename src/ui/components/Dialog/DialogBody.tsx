import React from 'react';

interface DialogBodyProps {
  children: React.ReactNode;
}

export function DialogBody({ children }: DialogBodyProps) {
  return (
    <div className="align-center flex flex-col justify-center self-center rounded-lg bg-neutral-700 p-4 text-slate-100">
      {children}
    </div>
  );
}
