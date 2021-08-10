import 'react-native-gesture-handler';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import DetailStoryScreen from './screens/detailStoryScreen';
import UpdateProfileScreen from './screens/updateProfileScreen';

import configureStore from './store/configureStore';

const store = configureStore();
const Stack = createStackNavigator();

function App() {
  _retrieveData = async () => {
    try {
      // await AsyncStorage.removeItem('accessToken');
      const value = await AsyncStorage.getItem('accessToken');
      return value;
    } catch (error) {
      return null;
    }
  };

  const [token, setToken] = React.useState(_retrieveData());
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {token ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="DetailStory"
                  component={DetailStoryScreen}
                />
                <Stack.Screen
                  name="UpdateProfile"
                  component={UpdateProfileScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
