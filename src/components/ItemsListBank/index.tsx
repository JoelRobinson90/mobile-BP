import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FC, memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { ItemProps } from '@/interfaces';
import { itemStyles } from '@/styles';

export const ItemsListBank: FC<ItemProps> = memo(({ title, id, onPress }) => {
  const { item, title: titleStyle, text } = itemStyles;
  return (
    <Pressable onPress={onPress}>
      <View style={item}>
        <View>
          <Text style={titleStyle}>{title}</Text>
          <Text style={text}>ID: {id}</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={14} color="#9a9a9a" />
      </View>
    </Pressable>
  );
});
