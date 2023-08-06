import EmptyStateCTA from '@/ui/components/EmptyState/EmptyStateCTA';
import { render, fireEvent } from '@testing-library/react';

describe('<EmptyStateCTA />', () => {
  it('Should show a component with the text property', () => {
    const text = 'example';

    const { getByText } = render(
      <EmptyStateCTA text={text} action={() => null} />
    );

    const element = getByText(text);

    expect(element.innerHTML).toEqual(text);
  });

  it('Should call action callback when button is clicked', () => {
    const text = 'example';
    const action = jest.fn();

    const { getByText } = render(<EmptyStateCTA text={text} action={action} />);

    const element = getByText(text);

    fireEvent.click(element);

    expect(action).toHaveBeenCalled();
  });
});
