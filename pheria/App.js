import 'react-native-gesture-handler';
import * as React from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/loginScreen';
import SplashScreen from './screens/splashScreen';
import HomeScreen from './screens/homeScreen';
import DetailStoryScreen from './screens/detailStoryScreen';
import UpdateProfileScreen from './screens/updateProfileScreen';

import configureStore from './store/configureStore';

const store = configureStore();
const Stack = createStackNavigator();

function App() {
  const [token, setToken] = React.useState(null);

  const { getItem } = useAsyncStorage('accessToken');

  const readItemFromStorage = async () => {
    const item = await getItem();
    setToken(item);
  };

  React.useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' >
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{headerShown: false}}
            />
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
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};