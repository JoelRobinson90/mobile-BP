import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { ItemsListBank } from '../../src/components/ItemsListBank';

describe('ItemsListBank Component', () => {
  const mockItem = {
    title: 'Item Title',
    id: '12345',
    onPress: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <ItemsListBank title={mockItem.title} id={mockItem.id} onPress={mockItem.onPress} />,
    );

    expect(getByText('Item Title')).toBeTruthy();
    expect(getByText('ID: 12345')).toBeTruthy();
  });

  it('handles onPress correctly', () => {
    const { getByText } = render(
      <ItemsListBank title={mockItem.title} id={mockItem.id} onPress={mockItem.onPress} />,
    );

    fireEvent.press(getByText('Item Title'));

    expect(mockItem.onPress).toHaveBeenCalledTimes(1);
  });
});
