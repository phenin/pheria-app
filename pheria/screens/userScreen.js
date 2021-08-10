import * as React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, shallowEqual} from 'react-redux';
import {vh} from '../plugins/viewport-unit';
import DetailUser from '../components/user/detailUser'
import {Button} from 'native-base'
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserScreen({navigation}) {
  const state = useSelector(stateSelector, shallowEqual);

  const {user} = state

  const signOut = async () =>{
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaProvider style={{backgroundColor: "#000"}}>
      <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 100 * vh,
        }}>
          <DetailUser user={user} />
          <Button style={styles.my3} onPress={() => navigation.navigate('UpdateProfile')}>Chỉnh sửa thông tin cá nhân</Button>
          <Button colorScheme="danger" style={styles.my3} onPress={()=>signOut()}>Đăng xuất</Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function stateSelector(state) {
  return { 
    user: state.user.user,
  };
}

const styles = StyleSheet.create({
  my3: {
    marginTop: 12,
    marginBottom: 12,
  },
});