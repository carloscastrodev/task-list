import React from 'react';

interface TasksRootProps {
  children: React.ReactNode;
}

export function TasksRoot({ children }: TasksRootProps) {
  return <div className="flex flex-col gap-2 p-2">{children}</div>;
}
