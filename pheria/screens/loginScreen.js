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
  extendTheme
} from 'native-base';
import { useDispatch } from 'react-redux'
import {
  login,
} from '../store/actions/userActions'

export default function LoginScreen() {
  const dispatch = useDispatch()
  const [form, setForm] = React.useState({})

  const handleChangeInput = (key, value) => {
    setForm({
      ...form, 
      [key]: value
    })
  }

  const handleSubmit = () => {
    dispatch(login(form))
    
  }

  const theme = extendTheme({
    components: {
      Button: {
        variants: {
          rounded: () => {
            return {
              bg: `dark.500`,
              rounded: 'full',
              width: 60,
              height: 60 
            };
          },
          signin: () =>{
            return {
              bg: 'dark',
              border: 1,
              borderColor: 'white',
              width: 200,
              color: 'white',
              rounded: '30',
            }
          }
        },
      },
      Input: {
        baseStyle: {
          width: 200,
          color: 'white'
        },
        
      }
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Center
        flex={1}
        p={2}
        w="100%"
        mx='auto'
        bg='black'
      >
        <Center
          border={1}
          borderColor='white'
          borderRadius='10'
          height={310}
          width={{
            base: 310,
            lg: 400,
          }}
        >
          <VStack space={2} mt={2} alignItems="center">
            <Text fontSize='32' color='white' fontWeight={400}>ĐĂNG NHẬP</Text>
            <Button
              size='sm'
              variant='rounded'
              startIcon={<IconButton
                variant='unstyled'
                startIcon={
                  <Icon name="google" size={15} color="#000" />
                }
              />}
              onPress={() => console.log("hello world")}
            >
            </Button>
            <FormControl>
              <Input placeholder="Địa chỉ email" 
                onChangeText={(v) => handleChangeInput('email', v)}/>
            </FormControl>
            <FormControl >
              <Input type="password" placeholder="Mật khẩu" color="white"
                onChangeText={(v) => handleChangeInput('password', v)}/>
            </FormControl>
            <VStack  space={2}>
              <Button variant='signin' _text={{color: 'white' }}
                onPress={() => handleSubmit()}>
                Login
              </Button>
            </VStack>
            <HStack justifyContent="center">
              <Link _text={{ color: 'white', bold: true, fontSize: 'sm' }} href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}