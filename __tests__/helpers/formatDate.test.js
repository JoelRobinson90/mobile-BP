import { formatDate } from '../../src/helpers/formatDate';

describe('formatDate', () => {
  it('formats current date correctly when no inputDate is provided', () => {
    const { formattedDate, formattedNextYearDate } = formatDate();

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const nextYear = year + 1;

    expect(formattedDate).toBe(`${day}/${month}/${year}`);
    expect(formattedNextYearDate).toBe(`${day}/${month}/${nextYear}`);
  });

  it('formats given date correctly', () => {
    const inputDate = '27/06/2024';
    const { formattedDate, formattedNextYearDate } = formatDate(inputDate);

    expect(formattedDate).toBe('27/06/2024');
    expect(formattedNextYearDate).toBe('27/06/2025');
  });

  it('handles single digit day and month correctly', () => {
    const inputDate = '5/4/2023';
    const { formattedDate, formattedNextYearDate } = formatDate(inputDate);

    expect(formattedDate).toBe('05/04/2023');
    expect(formattedNextYearDate).toBe('05/04/2024');
  });

  it('handles invalid date format correctly', () => {
    const inputDate = 'invalid date';
    const { formattedDate, formattedNextYearDate } = formatDate(inputDate);

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const nextYear = year + 1;

    expect(formattedDate).toBe(`${day}/${month}/${year}`);
    expect(formattedNextYearDate).toBe(`${day}/${month}/${nextYear}`);
  });
});
