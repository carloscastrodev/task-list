import { forwardRef } from 'react';

type InputTextProps = {
  isErrored?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputText = forwardRef<HTMLInputElement | null, InputTextProps>(
  ({ isErrored, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`appearance-none border shadow ${
          (isErrored && 'border-red-600') || 'border-slate-100'
        } focus:shadow-outline" id="add-task" data-test-id="add-task w-full rounded bg-transparent px-3 py-2 leading-tight text-slate-100 placeholder:text-gray-400 focus:outline-white`}
        type="text"
        {...rest}
      />
    );
  }
);

export default InputText;
