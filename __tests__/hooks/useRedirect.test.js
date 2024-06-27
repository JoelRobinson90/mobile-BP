import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { renderHook } from '@testing-library/react-hooks';

import { useRedirect } from '../../src/hooks/useRedirect';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  CommonActions: {
    reset: jest.fn(),
  },
}));

describe('useRedirect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to a path correctly', () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    const mockParams = { someParam: 'value' };
    useRoute.mockReturnValue({ params: mockParams });

    const { result } = renderHook(() => useRedirect());

    result.current.goTo('DestinationScreen', { additionalParams: 'someValue' });

    expect(mockNavigate).toHaveBeenCalledWith('DestinationScreen', {
      additionalParams: 'someValue',
    });
  });

  it('should set params and go back correctly', () => {
    const mockNavigate = jest.fn();
    const mockDispatch = jest.fn((callback) => {
      const state = {
        routes: [{ key: 'routeKey', params: {} }],
        index: 1,
      };
      return callback(state);
    });
    useNavigation.mockReturnValue({ navigate: mockNavigate, dispatch: mockDispatch });

    const mockParams = { someParam: 'value' };
    useRoute.mockReturnValue({ params: mockParams });

    const { result } = renderHook(() => useRedirect());

    const updatedParams = { updatedParam: 'newValue' };
    result.current.setParamsAndGoBack(updatedParams);

    expect(CommonActions.reset).toHaveBeenCalledWith({
      routes: [{ key: 'routeKey', params: updatedParams }],
      index: 0,
    });
  });
});
