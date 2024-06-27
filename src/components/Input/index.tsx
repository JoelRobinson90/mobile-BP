import React, { FC, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, Text, View } from 'react-native';

import { handleDateChange } from '@/helpers/handleDateChange';
import { InputProps } from '@/interfaces';
import { inputStyles } from '@/styles';

export const Input: FC<InputProps> = memo(
  ({ name, label, isDate = false, editable = true, ...extraProps }) => {
    const { control } = useFormContext();
    const { inputContainer, input, label: labelStyle, error: errorStyle } = inputStyles;

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          const { message } = error || { message: '' };
          return (
            <View style={inputContainer}>
              {label && <Text style={labelStyle}>{label}</Text>}
              <TextInput
                {...extraProps}
                maxLength={isDate ? 10 : 250}
                editable={editable}
                onBlur={onBlur}
                onChangeText={(e) => (isDate ? handleDateChange(e, onChange) : onChange(e))}
                value={value}
                style={{
                  ...input,
                  borderColor: message ? 'red' : '#00000019',
                  backgroundColor: editable ? 'white' : '#f3f3f3',
                  color: editable ? 'black' : '#00000050',
                }}
              />
              {message && <Text style={errorStyle}>{message}</Text>}
            </View>
          );
        }}
      />
    );
  },
);
