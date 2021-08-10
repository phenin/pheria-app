import * as React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  NativeBaseProvider,
  Text,
  Center,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  IconButton,
  HStack,
  extendTheme,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {login} from '../store/actions/userActions';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '279484816241-tt5n888b74m6kulj3i97bmfo3c0d9n10.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});


export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({});

  const handleChangeInput = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    const success = dispatch(login(form));
    if(success) {
      navigation.navigate('Home');
    }
  };

  const theme = extendTheme({
    components: {
      Button: {
        variants: {
          rounded: () => {
            return {
              bg: `dark.500`,
              rounded: 'full',
              width: 60,
              height: 60,
            };
          },
          signin: () => {
            return {
              bg: 'dark',
              border: 1,
              borderColor: 'white',
              width: 200,
              color: 'white',
              rounded: '30',
            };
          },
        },
      },
      Input: {
        baseStyle: {
          width: 200,
          color: 'white',
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1} p={2} w="100%" mx="auto" bg="black">
        <Center
          border={1}
          borderColor="white"
          borderRadius="10"
          height={310}
          width={{
            base: 310,
            lg: 400,
          }}>
          <VStack space={2} mt={2} alignItems="center">
            <Text fontSize="32" color="white" fontWeight={400}>
              ĐĂNG NHẬP
            </Text>
            <Button
              size="sm"
              variant="rounded"
              startIcon={
                <IconButton
                  variant="unstyled"
                  startIcon={<Icon name="google" size={15} color="#000" />}
                />
              }
              onPress={() => console.log('hello world')}></Button>
            <FormControl>
              <Input
                placeholder="Địa chỉ email"
                onChangeText={v => handleChangeInput('email', v)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                placeholder="Mật khẩu"
                color="white"
                onChangeText={v => handleChangeInput('password', v)}
              />
            </FormControl>
            <VStack space={2}>
              <Button
                variant="signin"
                _text={{color: 'white'}}
                onPress={() => handleSubmit()}>
                Login
              </Button>
            </VStack>
            <HStack justifyContent="center">
              <Link
                _text={{color: 'white', bold: true, fontSize: 'sm'}}
                href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
