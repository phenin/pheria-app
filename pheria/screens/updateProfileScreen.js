import * as React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {vw, vh} from '../plugins/viewport-unit';
import {Button, Center, Input, Text, Modal, Image} from 'native-base'
import {StyleSheet, TouchableOpacity} from 'react-native';
import UploadImage from '../components/common/uploadImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {updateUserProfile} from '../store/actions/userActions'

export default function UserScreen({navigation}) {
  const [dialog, setDialog] = React.useState(false)
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const {user, loading} = state

  const [form, setForm] = React.useState({
    name: user.name,
    description: user.description,
    picture: user.picture || null
  })

  const handleChangeInput = (key, event) => {
    setForm({...form, [key]: event.nativeEvent.text});
  };

  const upload = link => {
    setForm({...form, picture: link});
  };

  const openModal = () =>{
    setDialog(true)
  }

  const closeModal = () =>{
    setDialog(false)
  }

  const save = async () =>{
    const params = {
      _id: state.user._id,
      ...form
    }
    const success = await dispatch(updateUserProfile(params))
    if(success){
      navigation.goBack()
    }
  }

  return (
    <SafeAreaProvider style={{backgroundColor: "#000"}}>
      <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 100 * vh,
        }}>
          <Center>
            {
              form.picture ? <Image borderRadius={100} width={30*vw} height={30*vw}
                style={styles.my3} source={{uri: form.picture}} alt="image-story" />
              : <Icon name="image" size={30*vw} color={'#fff'} style={styles.my3}/>
            } 
            
            <TouchableOpacity style={styles.my3} onPress={()=>openModal()}><Text>Upload ảnh</Text></TouchableOpacity>
            <Input
              style={styles.my3}
              isFullWidth={true}
              variant="rounded"
              placeholder="Tên hiển thị"
              defaultValue={form.name}
              _light={{
                placeholderTextColor: "#fff",
                color: "#fff",
              }}
              _dark={{
                placeholderTextColor: "#fff",
                color: "#fff",
              }}
              onChange={v => handleChangeInput('name', v)}
            />
            <Input
              style={styles.my3}
              isFullWidth={true}
              variant="rounded"
              placeholder="Mô tả bản thân"
              defaultValue={form.description}
              _light={{
                placeholderTextColor: "#fff",
                color: "#fff",
              }}
              _dark={{
                placeholderTextColor: "#fff",
                color: "#fff",
              }}
              onChange={v => handleChangeInput('description', v)}
            />
            <Button style={styles.btn} onPress={()=>save()} isLoading={loading}>Lưu</Button>
          </Center>
          <Modal size="full" isOpen={dialog} onClose={() => closeModal()}>
            <Modal.Content style={{marginBottom: 0, marginTop: 'auto'}}>
              <Modal.CloseButton />
              <Modal.Header>Đăng ảnh</Modal.Header>
              <Modal.Body>
                <UploadImage upload={upload} />
              </Modal.Body>
            </Modal.Content>
          </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function stateSelector(state) {
  return { 
    user: state.user.user,
    loading: state.user.loading
  };
}

const styles = StyleSheet.create({
  my3: {
    marginTop: 12,
    marginBottom: 12,
  },
  btn: {
    marginTop: 12,
    width: '100%'
  }
});