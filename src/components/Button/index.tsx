import { FC, memo } from 'react';
import { Text } from 'react-native';

import { MainButtonProps } from '@/interfaces';
import { buttonStyles } from '@/styles';

const buttonColors = {
  submit: {
    bg: '#f6d900',
    color: 'black',
  },
  delete: {
    bg: '#bd0000',
    color: 'white',
  },
  cancel: {
    bg: '#f0f0f0',
    color: 'black',
  },
};

export const Button: FC<MainButtonProps> = memo(({ title, type = 'submit', onPress }) => {
  const { button } = buttonStyles;
  const { bg, color } = buttonColors[type];
  return (
    <Text style={{ ...button, backgroundColor: bg, borderColor: bg, color }} onPress={onPress}>
      {title}
    </Text>
  );
});
