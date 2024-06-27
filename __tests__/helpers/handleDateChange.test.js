import { handleDateChange } from '../../src/helpers/handleDateChange';

describe('handleDateChange', () => {
  it('formats input correctly when length is 2 or less', () => {
    const onChangeMock = jest.fn();
    handleDateChange('12', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12');
  });

  it('formats input correctly when length is more than 2 but less than or equal to 4', () => {
    const onChangeMock = jest.fn();
    handleDateChange('123', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/3');
  });

  it('formats input correctly when length is more than 4', () => {
    const onChangeMock = jest.fn();
    handleDateChange('12345', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/34/5');
  });

  it('removes non-numeric characters', () => {
    const onChangeMock = jest.fn();
    handleDateChange('12a34b5', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/34/5');
  });

  it('handles empty input', () => {
    const onChangeMock = jest.fn();
    handleDateChange('', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('');
  });

  it('formats input with exactly 4 characters correctly', () => {
    const onChangeMock = jest.fn();
    handleDateChange('1234', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/34');
  });

  it('formats input with exactly 5 characters correctly', () => {
    const onChangeMock = jest.fn();
    handleDateChange('12345', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/34/5');
  });

  it('formats input with exactly 6 characters correctly', () => {
    const onChangeMock = jest.fn();
    handleDateChange('123456', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/34/56');
  });

  it('formats input with more than 6 characters correctly', () => {
    const onChangeMock = jest.fn();
    handleDateChange('1234567', onChangeMock);
    expect(onChangeMock).toHaveBeenCalledWith('12/34/567');
  });
});
