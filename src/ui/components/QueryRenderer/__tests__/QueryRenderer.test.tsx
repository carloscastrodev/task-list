import { QueryHook } from '@/types/hooks';
import QueryRenderer from '@/ui/components/QueryRenderer';
import { render } from '@testing-library/react';

describe('<QueryRenderer />', () => {
  const mockUseQueryHook = jest.fn();

  const loaderId = 'loader';
  const loaderComponent = () => <div data-testid={loaderId} />;

  const renderId = 'render';
  const renderComponent = () => <div data-testid={renderId} />;

  const errorId = 'error';
  const errorComponent = () => <div data-testid={errorId} />;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render loaderComponent, but not renderComponent or errorComponent when isLoading is true', () => {
    const mockImp: QueryHook<[], void> = () => ({
      isError: true,
      isLoading: true,
      queryKey: ['key'],
      refetch: () => null,
      data: [],
    });

    mockUseQueryHook.mockImplementation(mockImp);

    const { queryByTestId } = render(
      <QueryRenderer
        renderComponent={renderComponent}
        useQueryHook={mockUseQueryHook}
        errorComponent={errorComponent}
        loaderComponent={loaderComponent}
      />
    );

    const loaderElement = queryByTestId(loaderId);
    const errorElement = queryByTestId(errorId);
    const renderElement = queryByTestId(renderId);

    expect(loaderElement).toBeDefined();
    expect(errorElement).toBeNull();
    expect(renderElement).toBeNull();
  });

  it('Should render errorComponent, but not renderComponent when isError is true and isLoading is false', () => {
    const mockImp: QueryHook<[], void> = () => ({
      isError: true,
      isLoading: false,
      queryKey: ['key'],
      refetch: () => null,
      data: [],
    });

    mockUseQueryHook.mockImplementation(mockImp);

    const { queryByTestId } = render(
      <QueryRenderer
        renderComponent={renderComponent}
        useQueryHook={mockUseQueryHook}
        errorComponent={errorComponent}
        loaderComponent={loaderComponent}
      />
    );

    const errorElement = queryByTestId(errorId);
    const renderElement = queryByTestId(loaderId);

    expect(errorElement).toBeDefined();
    expect(renderElement).toBeNull();
  });

  it('Should render renderComponent, but not errorComponent or loaderComponent when data is defined, isError is false and isLoading is false ', () => {
    const mockImp: QueryHook<[], void> = () => ({
      isError: false,
      isLoading: false,
      queryKey: ['key'],
      refetch: () => null,
      data: [],
    });

    mockUseQueryHook.mockImplementation(mockImp);

    const { queryByTestId } = render(
      <QueryRenderer
        renderComponent={renderComponent}
        useQueryHook={mockUseQueryHook}
        errorComponent={errorComponent}
        loaderComponent={loaderComponent}
      />
    );

    const loaderElement = queryByTestId(loaderId);
    const errorElement = queryByTestId(errorId);
    const renderElement = queryByTestId(renderId);

    expect(loaderElement).toBeNull();
    expect(errorElement).toBeNull();
    expect(renderElement).toBeDefined();
  });
});
