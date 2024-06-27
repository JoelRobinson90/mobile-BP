export const formatDate = (inputDate?: string) => {
  let currentDate;

  if (inputDate) {
    const [day, month, year] = inputDate.split('/').map(Number);
    currentDate = new Date(year, month - 1, day);
  } else {
    currentDate = new Date();
  }

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const nextYear = year + 1;
  const formattedNextYearDate = `${day}/${month}/${nextYear}`;

  return {
    formattedDate,
    formattedNextYearDate,
  };
};
