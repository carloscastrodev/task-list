import { PrimaryButton } from '@/ui/components/Button';
import { InputErrorMessage, InputText } from '@/ui/components/Input';
import { useRef, useState } from 'react';

interface TasksAddTaskInputProps {
  onAddTask: (description: string) => void;
}

export function TasksAddTaskInput({ onAddTask }: TasksAddTaskInputProps) {
  const [isErrored, setIsErrored] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const value = ref.current?.value;

    if (!value) {
      setIsErrored(true);
    } else {
      setIsErrored(false);
      onAddTask(value);
      ref.current!.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <form onSubmit={onSubmit}>
        <div className="flex gap-4">
          <InputText
            ref={ref}
            placeholder="Type in to add a new task..."
            isErrored={isErrored}
          />

          <div className="h-full w-[100px]">
            <PrimaryButton type="submit">Add Task</PrimaryButton>
          </div>
        </div>
      </form>

      {isErrored && <InputErrorMessage />}
    </div>
  );
}
