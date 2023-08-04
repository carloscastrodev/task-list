interface TasksDescriptionProps {
  description: string;
  done?: boolean;
}

export function TasksDescription({ description, done }: TasksDescriptionProps) {
  return (
    <p
      className={`text-ellipsis font-medium ${
        done ? 'line-through' : ''
      } self-center align-middle`}
      title={description}
    >
      {description}
    </p>
  );
}
