import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { CreateEditContainer } from '../../src/pages/createEdit/container';

jest.mock('@/hooks/useRedirect', () => ({
  useRedirect: () => ({
    setParamsAndGoBack: jest.fn(),
    params: {
      id: 'mockId',
      name: 'Mock Product',
      description: 'Mock Description',
      logo: 'https://www.mocklogo.jpg',
      date_release: '2024-07-01',
      date_revision: '2025-07-01',
    },
  }),
}));

describe('CreateEditContainer', () => {
  test('Submit form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(<CreateEditContainer />);

    fireEvent.changeText(getByPlaceholderText('Tarjeta Crédito'), 'Nuevo Nombre');
    fireEvent.changeText(getByPlaceholderText('Descripción...'), 'Nueva Descripción');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(getByText('Cargando...')).toBeDefined();
    });
  });

  test('Automatic date_revision update on date_release change', async () => {
    const { getByPlaceholderText } = render(<CreateEditContainer />);

    fireEvent.changeText(getByPlaceholderText('01/01/1990'), '01/07/2024');

    await waitFor(() => {
      expect(getByPlaceholderText('01/01/1991').props.value).toEqual('01/07/2025');
    });
  });
});
