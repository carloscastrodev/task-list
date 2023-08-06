import { InputText } from '@/ui/components/Input';
import { render } from '@testing-library/react';

describe('<InputText />', () => {
  it('Should be a HTML input', () => {
    const componentDataTestId = 'input-text';
    const { getByTestId } = render(
      <InputText data-testid={componentDataTestId} />
    );

    const element = getByTestId(componentDataTestId);

    expect(element.tagName).toEqual('INPUT');
  });

  it('Should have a different appearance when isErrored property is true', () => {
    const errorId = 'error';
    const noErrorId = 'no-error';

    const { getByTestId } = render(
      <>
        <InputText data-testid={errorId} isErrored />
        <InputText data-testid={noErrorId} />
      </>
    );

    const inputWithError = getByTestId(errorId);
    const inputWithNoError = getByTestId(noErrorId);

    expect(inputWithError.className).not.toEqual(inputWithNoError.className);
  });
});
