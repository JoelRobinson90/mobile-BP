import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { Actionsheet } from '../../src/components/Actionsheet';

const mockClose = jest.fn();
const mockConfirm = jest.fn();

describe('Actionsheet Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Actionsheet name="Test Product" close={mockClose} confirm={mockConfirm} />,
    );

    expect(getByText('¿Estás seguro de eliminar el producto Test Product?')).toBeTruthy();
  });

  it('calls close and confirm functions on button press', () => {
    const { getByText } = render(
      <Actionsheet name="Test Product" close={mockClose} confirm={mockConfirm} />,
    );

    fireEvent.press(getByText('Confirmar'));
    expect(mockConfirm).toHaveBeenCalled();

    fireEvent.press(getByText('Cancelar'));
    expect(mockClose).toHaveBeenCalled();
  });
});
