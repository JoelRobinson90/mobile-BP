export const changeDateFormat = (date: string) => {
  if (!date) return '';
  const [day, month, year] = date.split('/');
  if (!year || !month || !day) return '';
  return `${year}-${month}-${day}`;
};

export const revertChangeDateFormat = (date: string) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
};
