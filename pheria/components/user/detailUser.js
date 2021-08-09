import * as React from 'react';
import {Heading, Center, Image, Box, Text, Flex, ScrollView} from 'native-base';
import {useSelector, shallowEqual} from 'react-redux';
import {StyleSheet} from 'react-native';
import {vw, vh} from '../../plugins/viewport-unit';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ActionStory({user}) {
  const state = useSelector(stateSelector, shallowEqual);

  return (
    <>
      <Flex direction={'row'} >
        <Center flex={1}>
          {
            user.picture ? (
              <Image width={20*vw} height={20*vw} source={{uri: item.author.picture}} alt="avatar"/>
            ) : (
              <Icon
                name="user-circle"
                size={20*vw}
                color={'#fff'}
              />
            )
          }
          <Heading size="lg" style={{marginTop: 10}}>{user.name}</Heading>
          
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
      <Box style={{marginTop: 30, marginBottom:30}}>
        <Text>{user.description}</Text>
      </Box>
      <Box>
        <ScrollView height={40 * vh}>
        {
          state.listStory.map((item, index)=>{
            return (
              <Flex direction={'row'} alignItems={'center'} justifyContent={'space-around'} style={{marginBottom: 10}}>
                {
                  item.image ? <Image width={10*vw} height={10*vw} source={{uri: item.image}} alt="image-story" />
                  : <Icon name="image" size={10*vw} color={'#fff'}/>
                }
                
                <Text style={styles.mx3} ellipsizeMode='tail' numberOfLines={1} flex={1}>{item.title}</Text>
                <Text style={styles.mx1}>{item.views.length}</Text>
                <Icon style={styles.mx1} name="eye" size={3*vw} color={'#fff'}/>
                <Text style={styles.mx1}>{item.hearts.length}</Text>
                <Icon style={styles.mx1} name="heart" size={3*vw} color={'#fff'}/>
                <Text style={styles.mx1}>{item.comments.length}</Text>
                <Icon style={styles.mx1} name="comment" size={3*vw} color={'#fff'}/>
              </Flex>
            )
          })
        }
        </ScrollView>
      </Box>
    </>
  );
}

function stateSelector(state) {
  return {
    listStory: state.user.listStory,
  };
}

const styles = StyleSheet.create({
  mx3: {
    marginLeft: 12,
    marginRight: 12,
  },
  mx1: {
    marginLeft: 4,
    marginRight: 4
  }
});