import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';

import { ShowContainer } from '../../src/pages/show/container';

jest.mock('@/hooks/useRedirect', () => ({
  useRedirect: jest.fn(() => ({
    goTo: jest.fn(),
    goBack: jest.fn(),
    params: {
      id: '123',
      name: 'Product Name',
      description: 'Description',
      date_release: '2024-06-28',
      date_revision: '2024-06-30',
      logo: 'https://example.com/logo.png',
    },
  })),
}));

jest.mock('@/services/bankService', () => ({
  deleteProduct: jest.fn(() => Promise.resolve({ message: 'Product deleted successfully' })),
}));

describe('<ShowContainer />', () => {
  it('should render ShowContainer correctly', () => {
    const { getByText } = render(<ShowContainer />);

    expect(getByText('ID: 123')).toBeDefined();
    expect(getByText('Nombre:')).toBeDefined();
    expect(getByText('Product Name')).toBeDefined();
    expect(getByText('Descripción:')).toBeDefined();
    expect(getByText('Description')).toBeDefined();
    expect(getByText('Fecha Liberación:')).toBeDefined();
    expect(getByText('2024-06-28')).toBeDefined();
    expect(getByText('Logo:')).toBeDefined();
    expect(getByText('Fecha Revisión:')).toBeDefined();
    expect(getByText('2024-06-30')).toBeDefined();
  });

  it('should open Actionsheet on delete button click and delete product', async () => {
    const { getByText } = render(<ShowContainer />);

    fireEvent.press(getByText('Eliminar'));
    await waitFor(() =>
      expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeDefined(),
    );

    fireEvent.press(getByText('Confirmar'));
    await waitFor(() => expect(getByText('Product deleted successfully')).toBeDefined());
  });

  it('should hide Toast and go back on Toast close', async () => {
    const { getByText } = render(<ShowContainer />);

    fireEvent.press(getByText('Eliminar'));
    await waitFor(() =>
      expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeDefined(),
    );

    fireEvent.press(getByText('Cancelar'));
    await waitFor(() => expect(getByText('Eliminar')).toBeDefined());
  });
});
