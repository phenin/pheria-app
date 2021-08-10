import * as React from 'react';
import {Box, ScrollView, Text, Image} from 'native-base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {vw, vh} from '../plugins/viewport-unit';
import Draggable from 'react-native-draggable';
import {REACT_APP_API} from '../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import DoubleTap from '../components/common/doubleTap';
import {heartStory, getListCommentStory} from '../store/actions/storyActions';
import ActionStory from '../components/story/actionStory';
import ListCommentModal from '../components/story/commentModal';

import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
function DetailStoryScreen({navigation}) {

  React.useEffect(() => {
    const token = _retrieveData()
    if(!token) {
      navigation.navigate('Login');
    }
  }, [navigation]);
  
  const state = useSelector(stateSelector, shallowEqual);
  const [backgroundColor, setBackgroundColor] = React.useState('#000000');
  const {background, templates, contents} = state;
  const dispatch = useDispatch()
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [dialog, setDialog] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <Text bold style={{color: '#000000'}}>
          {state.title}
        </Text>
      ),
      headerRight: () => (
        <Icon
          name="ellipsis1"
          size={24}
          style={{marginLeft: 10, marginRight: 10}}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, state]);

  const {id} = state

  React.useEffect(() => {
    dispatch(getListCommentStory({_id: id}));
  },[dispatch, getListCommentStory, id])

  React.useEffect(() => {
    if (
      background &&
      background.backgroundColor &&
      background.backgroundColor.length > 2
    ) {
      setBackgroundColor(
        `radial-gradient(${background.backgroundColor[0]}, ${background.backgroundColor[1]})`,
      );
    } else if (background && background.backgroundColor.length === 1) {
      setBackgroundColor(background.backgroundColor[0]);
    }
  }, [background, setBackgroundColor]);

  const heart = (id) =>{
    dispatch(heartStory(id, true))

    Animated.sequence([
      Animated.spring(animatedValue, { toValue: 1 }),
      Animated.spring(animatedValue, { toValue: 0 }),
    ]).start();
  }

  const openModal = () => {
    setDialog(true);
  };

  const closeModal = () => {
    setDialog(false);
  };

  renderOverlay = () => {
    const imageStyles = [
      styles.overlayHeart,
      {
        opacity: animatedValue,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1.5],
            }),
          },
        ],
      },
    ];

    return (
      <View style={styles.overlay}>
        <Animated.Image
          source={require('../images/heart.png')}
          style={imageStyles}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{backgroundColor: backgroundColor}}>
      <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 100 * vh,
        }}>
        
        <Box flex={1} style={{paddingTop: 0, paddingBottom: 30}}>
          <ScrollView>
            <DoubleTap onDoubleTap={()=>heart(state.id)}>
              <Box style={{height: 500 * vh}}>
                <Draggable x={0} y={0} disabled>
                  <Box width={100 * vw} height={1} bg={background.color} />
                </Draggable>
                {templates.map((item, index) => {
                  return (
                    <Box key={'templates' + index}>
                      <Draggable
                        x={item.x}
                        y={item.y}
                        disabled
                        renderSize={item.template.width * 2 * vw}>
                        <Image
                          source={{uri: REACT_APP_API + item.template.image}}
                          width={item.template.width * 2 * vw}
                          height={item.template.height * 2 * vh}
                          alt={item.template.code}
                        />
                      </Draggable>
                    </Box>
                  );
                })}
                {contents.map((item, index) => {
                  return (
                    <Box
                      key={'content' + index}
                      width={(item.width - 10) * vw}
                      height={(item.height - 10) * vw}>
                      <Draggable x={item.x} y={item.y} disabled>
                        <Text style={{color: background && background.color}}>{item.text}</Text>
                      </Draggable>
                    </Box>
                  );
                })}
                <Draggable x={0} y={500 * vh} disabled>
                  <Box width={100 * vw} height={2} bg={background.color} />
                </Draggable>
              </Box>
            </DoubleTap>
          </ScrollView>
          {this.renderOverlay()}
          <ActionStory showHeart={(id)=>heart(id)} openComment={openModal}/>
        </Box>
        {
          dialog && (
            <ListCommentModal dialog={dialog} closeModal={closeModal} />
          )
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function stateSelector(state) {
  return {
    background: state.story.background,
    templates: state.story.templates,
    contents: state.story.contents,
    title: state.story.title,
    id: state.story._id
  };
}

const styles = StyleSheet.create({
  heartIcon: {
    width: 20,
    height: 20,
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 40 * vh,
  },
  overlayHeart: {
    tintColor: '#ed4956',
  },
});

export default DetailStoryScreen;
