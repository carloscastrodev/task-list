interface TasksUsageDescriptionProps {
  description: string;
}

export function TasksUsageDescription({
  description,
}: TasksUsageDescriptionProps) {
  return (
    <p className={`text-ellipsis text-xs font-light text-gray-300`}>
      {description}
    </p>
  );
}
