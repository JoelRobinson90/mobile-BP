import { render } from '@testing-library/react-native';
import React from 'react';

import { Toast } from '../../src/components/Toast';

describe('Toast Component', () => {
  const mockToast = {
    text: 'Mensaje de prueba',
    error: false,
    hiddenToast: jest.fn(),
  };

  it('renders correctly when there is text', async () => {
    const { getByText } = render(
      <Toast text={mockToast.text} error={mockToast.error} hiddenToast={mockToast.hiddenToast} />,
    );

    expect(getByText('Mensaje de prueba')).toBeTruthy();
  });

  it('does not render when there is no text', () => {
    const { queryByText } = render(
      <Toast text="" error={mockToast.error} hiddenToast={mockToast.hiddenToast} />,
    );

    expect(queryByText('')).toBeNull();
  });
});
