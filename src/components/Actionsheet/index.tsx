import AntDesign from '@expo/vector-icons/AntDesign';
import React, { FC } from 'react';
import { View, Pressable, SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '@/components/Button';
import { ActionsheetProps } from '@/interfaces';
import { actionsheetStyles } from '@/styles';

export const Actionsheet: FC<ActionsheetProps> = ({ name, close, confirm }) => {
  const { container, inner, closeButton, textContainer, text, buttonContainer } = actionsheetStyles;
  return (
    <View style={container}>
      <View style={inner}>
        <View style={closeButton}>
          <Pressable onPress={close}>
            <AntDesign name="close" size={24} color="#6f6f6f" />
          </Pressable>
        </View>
        <View style={textContainer}>
          <SafeAreaView>
            <ScrollView style={{ marginVertical: 28 }}>
              <Text style={text}>¿Estás seguro de eliminar el producto {name}?</Text>
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={buttonContainer}>
          <Button title="Confirmar" onPress={confirm} />
          <View style={{ marginTop: 10 }} />
          <Button title="Cancelar" type="cancel" onPress={close} />
        </View>
      </View>
    </View>
  );
};
