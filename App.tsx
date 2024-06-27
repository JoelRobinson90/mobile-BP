import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';

import CreateEdit from '@/pages/createEdit';
import Main from '@/pages/main';
import Show from '@/pages/show';

const Stack = createNativeStackNavigator();

const App = () => {
  const optionsScreens: NativeStackNavigationOptions = {
    headerBackTitleVisible: false,
    headerTintColor: '#515151',
    headerTitleAlign: 'center',
    headerTitle: () => {
      return (
        <>
          <MaterialIcons name="payments" size={24} color="black" />
          <Text style={{ fontWeight: 700, fontSize: 18, marginStart: 5 }}>BANCO</Text>
        </>
      );
    },
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Main} options={optionsScreens} />
          <Stack.Screen name="CreateEdit" component={CreateEdit} options={optionsScreens} />
          <Stack.Screen name="Show" component={Show} options={optionsScreens} />
        </Stack.Navigator>
        <View style={{ paddingBottom: 30 }} />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
