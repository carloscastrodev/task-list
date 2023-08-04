import { Task } from '@/types/task';
import { TasksItem } from '@/ui/components/Tasks/TasksItem';

interface TasksItemSubtasksProps {
  task: Task;
  onCompleteTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
}

export function TasksItemSubtasks({
  task,
  onCompleteTask,
  onDeleteTask,
}: TasksItemSubtasksProps) {
  return (
    <>
      {task.subtasks.map((subtask) => (
        <div className="pl-6 text-xs" key={subtask.id}>
          <TasksItem
            task={subtask}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      ))}
    </>
  );
}
