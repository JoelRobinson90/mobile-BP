import { FC, memo, useEffect } from 'react';
import { View, Text } from 'react-native';

import { ToastProps } from '@/interfaces';
import { toastStyles } from '@/styles';

export const Toast: FC<ToastProps> = memo(({ text, error, hiddenToast }) => {
  const { container, text: textStyle } = toastStyles;

  useEffect(() => {
    if (text)
      setTimeout(() => {
        hiddenToast();
      }, 2500);
  }, [text]);

  if (!text) return null;

  return (
    <View style={{ ...container, backgroundColor: error ? '#dd0000' : '#00d015' }}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
});
