import 'react-native-gesture-handler';
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from 'native-base';
import Icon from 'react-native-vector-icons/Octicons';

import LoginScreen from "./screens/loginScreen"
import HomeScreen from "./screens/homeScreen"
import configureStore from './store/configureStore'

const store = configureStore();
const Tabs = AnimatedTabBarNavigator();

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
          <Tabs.Navigator initialRouteName="Home">
            {
              token ? (
                <>
                  <Tabs.Screen name="Home" component={HomeScreen}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="home"
                            size={size ? size : 24}
                            color={focused ? color : "#ffffff"}
                            focused={focused}
                            color={color}
                        />
                    )
                  }}/>
                </>
              )
              : (
                <>
                  <Tabs.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                </>
              )
            }
            
          </Tabs.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
      
    </Provider>
  );
}

export default App;
