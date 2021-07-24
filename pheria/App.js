import 'react-native-gesture-handler';
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from 'native-base';
import Icon from 'react-native-vector-icons/Octicons';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./screens/loginScreen"
import HomeScreen from "./screens/homeScreen"
import UserScreen from "./screens/userScreen"

import configureStore from './store/configureStore'

const store = configureStore();
const Tabs = AnimatedTabBarNavigator();
const Stack = createStackNavigator();

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
                  <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                </>
              ):
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
