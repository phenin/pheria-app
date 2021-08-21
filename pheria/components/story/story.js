import * as React from 'react';
import {Box, Text, Center} from 'native-base';
import {TouchableOpacity, ImageBackground} from 'react-native';
import {vw, vh} from '../../plugins/viewport-unit';
import {useDispatch} from 'react-redux';
import {getDetailStory} from '../../store/actions/storyActions';

function Story({data, navigation}) {
  const dispatch = useDispatch();

  const image = data.image
    ? {uri: data.image}
    : require('../../images/imagenull.png');

  const getDetail = _id => {
    dispatch(getDetailStory({_id}));
    navigation.navigate('DetailStory', {_id});
  };
  return (
    <Box
      bg="#1d232c"
      style={{
        flex: 1,
        justifyContent: 'center',
        width: 80 * vw,
        marginRight: 10 * vw,
        marginLeft: 10 * vw,
        marginTop: 4 * vw,
        marginBottom: 4 * vw,
        borderRadius: 30,
      }}>
      <TouchableOpacity onPress={() => getDetail(data._id)}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            height: 40 * vh,
            borderRadius: 30,
          }}>
          <Center>
            <Text style={{color: '#fff'}} fontSize="3xl">
              {data.title}
            </Text>
          </Center>
        </ImageBackground>
      </TouchableOpacity>
    </Box>
  );
}

export default Story;
