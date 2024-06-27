export const handleDateChange = (text: string, onChange: (...event: any[]) => void) => {
  let formattedText = text;

  formattedText = formattedText.replace(/[^0-9]/g, '');

  if (formattedText.length > 2 && formattedText.length <= 4) {
    formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
  } else if (formattedText.length > 4) {
    formattedText =
      formattedText.slice(0, 2) + '/' + formattedText.slice(2, 4) + '/' + formattedText.slice(4);
  }
  onChange(formattedText);
};
