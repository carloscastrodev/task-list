import { Task } from '@/types/task';
import { TasksAddSubtaskButton } from '@/ui/components/Tasks/TasksAddSubTaskButton';
import { TasksDeleteButton } from '@/ui/components/Tasks/TasksDeleteButton';
import { TasksDescription } from '@/ui/components/Tasks/TasksDescription';
import { TasksItemSubtasks } from '@/ui/components/Tasks/TasksItemSubtasks';
import { TasksMarkAsDoneButton } from '@/ui/components/Tasks/TasksMarkAsDoneButton';

interface TasksItemProps {
  task: Task;
  onCompleteTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  onAddSubtask?: (task: Task) => void;
}

export function TasksItem({
  task,
  onCompleteTask,
  onDeleteTask,
  onAddSubtask,
}: TasksItemProps) {
  return (
    <>
      <div
        className={`flex ${
          task.doneAt ? 'opacity-70' : ''
        } fade-in gap-4 border-b-2 border-gray-300 py-2`}
      >
        <div className="flex flex-grow">
          <TasksDescription
            description={task.description}
            done={!!task.doneAt}
          />
        </div>

        <div className="flex w-fit min-w-fit justify-end">
          {onAddSubtask && !task.doneAt && (
            <TasksAddSubtaskButton onClick={() => onAddSubtask(task)} />
          )}
        </div>

        <div className="flex w-fit min-w-fit justify-end">
          {onCompleteTask && !task.doneAt && (
            <TasksMarkAsDoneButton onClick={() => onCompleteTask(task)} />
          )}
        </div>

        <div className="flex w-fit min-w-fit justify-end">
          {onDeleteTask && (
            <TasksDeleteButton onClick={() => onDeleteTask(task)} />
          )}
        </div>
      </div>

      {!task.parentTaskId ? (
        <TasksItemSubtasks
          task={task}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      ) : null}
    </>
  );
}
