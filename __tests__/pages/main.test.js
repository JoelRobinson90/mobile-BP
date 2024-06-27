import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import React from 'react';

import { useRedirect } from '../../src/hooks/useRedirect';
import { MainContainer } from '../../src/pages/main/container';
import bankService from '../../src/services/bankService';

const mockGoTo = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (callback) => callback(),
}));

jest.mock('../../src/hooks/useRedirect');
jest.mock('../../src/services/bankService');
jest.mock('../../src/components/ItemsListBank', () => ({
  ItemsListBank: ({ title, onPress }) => <mocked-ItemsListBank title={title} onPress={onPress} />,
}));

describe('MainContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useRedirect.mockReturnValue({ goTo: mockGoTo });
    bankService.getProducts.mockResolvedValue([
      { id: '1', name: 'Product 1', onPress: () => jest.fn() },
      { id: '2', name: 'Product 2', onPress: () => jest.fn() },
    ]);
  });

  it('renders correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<MainContainer />);

    await act(async () => {
      expect(getByPlaceholderText('Buscar...')).toBeDefined();
      expect(getByText('No hay productos registrados')).toBeDefined();
    });
  });

  it('handles search input change', async () => {
    const { getByPlaceholderText, queryByText } = render(<MainContainer />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      fireEvent.changeText(getByPlaceholderText('Buscar...'), 'Product 1');
      await waitFor(() => {
        expect(queryByText('Product 1')).toBeDefined();
        expect(queryByText('Product 2')).toBeNull();
      });
    });
  });
});
