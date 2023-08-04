import React from 'react';

interface EmptyStateRootProps {
  children: React.ReactNode;
}

function EmptyStateRoot({ children }: EmptyStateRootProps) {
  return (
    <div className="gap flex h-fit w-fit flex-col items-center justify-center gap-2 self-center rounded-md border-2 border-solid border-slate-50 px-8 py-2">
      {children}
    </div>
  );
}

export default EmptyStateRoot;
