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
  const [token, setToken] = React.useState(null)

  React.useEffect(()=>{
    _retrieveData()
  },[])

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
        if (value !== null) {
        // We have data!!
        setToken(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#FFFFFF',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#000000',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
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
