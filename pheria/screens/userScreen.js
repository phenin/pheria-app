import * as React from 'react';
import {Heading, Center, extendTheme, Image, Box, Text, Flex} from 'native-base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh} from '../plugins/viewport-unit';

function UserScreen({navigation}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const {user} = state
  const theme = extendTheme({
    components: {},
  });

  return (
    <SafeAreaProvider style={{backgroundColor: "#000"}}>
      <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 100 * vh,
        }}>
          <Flex direction={'row'}>
            <Center flex={1}>
              {
                user.picture ? (
                  <Image width={24*vw} height={24*vw} source={{uri: item.author.picture}} alt="avatar"/>
                ) : (
                  <Icon
                    name="user-circle"
                    size={24*vw}
                    color={'#fff'}
                  />
                )
              }
              <Heading size="lg" style={{marginTop: 10}}>{user.name}</Heading>
              <Box>
                <Text>{user.description}</Text>
              </Box>
            </Center>
            <Flex direction={'row'} flex={2} alignItems={'center'} justifyContent={'space-around'}>
              <Box>
                <Center><Text>{user.followers.length}</Text></Center>
                <Text>Người theo dõi</Text>
              </Box>
              <Box>
                <Center><Text>{user.following.length}</Text></Center>
                <Text>Đang theo dõi</Text>
              </Box>
            </Flex>
          </Flex>
          
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function stateSelector(state) {
  return { 
    user: state.user.user
  };
}

export default UserScreen;
