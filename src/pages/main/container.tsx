import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, FlatList, TextInput, Text } from 'react-native';

import { Button } from '@/components/Button';
import { ItemsListBank } from '@/components/ItemsListBank';
import { searchProducts } from '@/helpers/searchProducts';
import { useRedirect } from '@/hooks/useRedirecxt';
import { BankProductProps } from '@/interfaces';
import bankService from '@/services/bankService';
import { bankListStyles, inputStyles, mainStyles } from '@/styles';

export const MainContainer = () => {
  const { goTo } = useRedirect();
  const [searchText, setSerchText] = useState('');
  const [bankProducts, setBankProducts] = useState<BankProductProps[]>([]);
  const [result, setResult] = useState<BankProductProps[]>([]);
  const { container, inner, list } = mainStyles;
  const { separator } = bankListStyles;
  const { input } = inputStyles;

  const onChangeSearch = (value: string) => {
    setSerchText(value);
    const result = searchProducts(bankProducts, value);
    if (value) setResult(result);
    else setResult(bankProducts);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data = await bankService.getProducts();
        setBankProducts(data);
        setResult(data);
      })();

      return () => setBankProducts([]);
    }, []),
  );

  return (
    <SafeAreaView style={container}>
      <View style={inner}>
        <View>
          <TextInput
            autoComplete="off"
            placeholder="Buscar..."
            onChangeText={onChangeSearch}
            value={searchText}
            style={{ ...input, borderColor: '#00000019', marginBottom: 30 }}
          />
          <View
            style={
              result.length
                ? list
                : { ...list, height: 100, justifyContent: 'center', alignContent: 'center' }
            }>
            {result.length ? (
              <FlatList
                data={result}
                ItemSeparatorComponent={() => <View style={separator} />}
                renderItem={({ item }) => (
                  <ItemsListBank
                    title={item.name}
                    id={item.id}
                    onPress={() => goTo('Show', { ...item })}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text style={{ textAlign: 'center', fontSize: 24, color: '#808080' }}>
                No hay productos registrados
              </Text>
            )}
          </View>
        </View>
        <Button title="Agregar" type="submit" onPress={() => goTo('CreateEdit')} />
      </View>
    </SafeAreaView>
  );
};
