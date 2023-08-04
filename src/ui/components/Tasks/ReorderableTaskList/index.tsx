import { StrictModeDroppable } from '@/packages/react-beautiful-dnd/StrictModeDroppable';
import { QueryRendererRenderComponent } from '@/types/hooks';
import { TaskList, Task } from '@/types/task';
import AddSubtaskDialog from '@/ui/components/Dialog/AddSubtaskDialog';
import DeleteTaskDialog from '@/ui/components/Dialog/DeleteTaskDialog';
import { EmptyState } from '@/ui/components/EmptyState';
import { Tasks } from '@/ui/components/Tasks';
import {
  useCompleteTask,
  useDeleteTask,
  useCreateTask,
  useCreateSubtask,
  useReorderTasks,
} from '@/usecases/tasks';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';

export const ReorderableTaskList: QueryRendererRenderComponent<TaskList> = ({
  data,
  queryKey,
}) => {
  const { mutate: completeTask } = useCompleteTask(queryKey);
  const { mutate: deleteTask } = useDeleteTask(queryKey);
  const { mutate: createTask } = useCreateTask(queryKey);
  const { mutate: createSubtask } = useCreateSubtask(queryKey);
  const { mutate: reorderTasks } = useReorderTasks(queryKey);
  const [taskToCreateSubtask, setTaskToCreateSubtask] = useState<
    Task | undefined
  >();
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>();

  const onDragEnd: OnDragEndResponder = (drag) => {
    if (drag.destination) {
      const taskIndex = drag.source.index;
      const destinationIndex = drag.destination.index;

      reorderTasks({ taskIndex, destinationIndex });
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <Tasks.AddTaskInput
        onAddTask={(description) => createTask({ description })}
      />

      {!!data.length && (
        <div className="self-center">
          <Tasks.UsageDescription description="Click and drag to reorder" />
        </div>
      )}

      {!!data.length && (
        <div className="h-100 overflow-auto">
          <DragDropContext
            onDragEnd={onDragEnd}
            dragHandleUsageInstructions="Click and drag to reorder"
          >
            <StrictModeDroppable droppableId="taskList">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Tasks.Root>
                    {data.map((task, index) => (
                      <Draggable
                        key={`${task.id}`}
                        draggableId={`${task.id}`}
                        index={index}
                      >
                        {(_provided) => (
                          <div
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            ref={_provided.innerRef}
                          >
                            <Tasks.Item
                              key={task.id}
                              task={task}
                              onCompleteTask={completeTask}
                              onDeleteTask={setTaskToDelete}
                              onAddSubtask={setTaskToCreateSubtask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </Tasks.Root>
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      )}

      {!data.length && (
        <EmptyState.Root>
          <EmptyState.Icon />
          <EmptyState.Message text="No tasks to display." />
        </EmptyState.Root>
      )}

      {taskToCreateSubtask ? (
        <AddSubtaskDialog
          task={taskToCreateSubtask}
          onClose={() => setTaskToCreateSubtask(undefined)}
          onSubmit={(description) => {
            createSubtask({
              description,
              parentTask: taskToCreateSubtask,
            });
            setTaskToCreateSubtask(undefined);
          }}
        />
      ) : null}

      {taskToDelete ? (
        <DeleteTaskDialog
          task={taskToDelete}
          onClose={() => setTaskToDelete(undefined)}
          onSubmit={() => {
            deleteTask(taskToDelete);
            setTaskToDelete(undefined);
          }}
        />
      ) : null}
    </div>
  );
};
