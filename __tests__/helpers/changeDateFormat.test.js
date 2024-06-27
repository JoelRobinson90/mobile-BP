import { changeDateFormat, revertChangeDateFormat } from '../../src/helpers/changeDateFormat';

describe('Date Utils', () => {
  describe('changeDateFormat', () => {
    it('changes date format from DD/MM/YYYY to YYYY-MM-DD', () => {
      const inputDate = '27/06/2024';
      const expectedOutput = '2024-06-27';
      expect(changeDateFormat(inputDate)).toBe(expectedOutput);
    });

    it('handles empty input', () => {
      const inputDate = '';
      const expectedOutput = '';
      expect(changeDateFormat(inputDate)).toBe(expectedOutput);
    });

    it('handles invalid input format', () => {
      const inputDate = '2024-06-27';
      const expectedOutput = '';
      expect(changeDateFormat(inputDate)).toBe(expectedOutput);
    });
  });

  describe('revertChangeDateFormat', () => {
    it('reverts date format from YYYY-MM-DD to DD/MM/YYYY', () => {
      const inputDate = '2024-06-27';
      const expectedOutput = '27/06/2024';
      expect(revertChangeDateFormat(inputDate)).toBe(expectedOutput);
    });

    it('handles empty input', () => {
      const inputDate = '';
      const expectedOutput = '';
      expect(revertChangeDateFormat(inputDate)).toBe(expectedOutput);
    });

    it('handles invalid input format', () => {
      const inputDate = '27/06/2024';
      const expectedOutput = '';
      expect(revertChangeDateFormat(inputDate)).toBe(expectedOutput);
    });
  });
});
