import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { NativeBaseProvider, extendTheme } from 'native-base';

import LoginScreen from "./screens/loginScreen"
import configureStore from './store/configureStore'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


const Stack = createStackNavigator();
const store = configureStore();

function App() {
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      return value
    } catch (error) {
      return null
    }
  };

  const [token, setToken] = React.useState(_retrieveData())

  return (
    <Provider store={store}>
      <NativeBaseProvider >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {
              token ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              )
              : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                </>
              )
            }
            
            
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
      
    </Provider>
  );
}

export default App;
