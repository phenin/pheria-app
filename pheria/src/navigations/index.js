import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import RootTab from './RootTab';
import { navigationRef } from './rootNavigation';
import Comment from '../screens/Root/Comment';
import StoryCreate from '../screens/Others/StoryCreate';
import EditProfile from '../screens/Home/Account/EditProfile';
import GalleryChooser from '../screens/Home/Account/GalleryChooser';
import Logout from '../screens/Home/Account/Logout';
import ProfileXScreen from '../screens/Home/Explore/ProfileX';
import StoryProcessor from '../screens/Others/StoryProcessor';
import StoryPreCreate from '../screens/Others/StoryPreCreate';

const RootStack = createStackNavigator()
const index = ()=> {
  const navigationOptions= {
    headerShown: false,
    gestureEnabled: false,
    cardStyle: {
    }
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName='RootTab'
        screenOptions={navigationOptions}>
          <RootStack.Screen name="RootTab" component={RootTab} />
          <RootStack.Screen name="Comment" component={Comment} />
          <RootStack.Screen options={{
                animationEnabled: false,
                cardStyle: { backgroundColor: 'transparent' }
            }} name="EditProfile" component={EditProfile} />
          <RootStack.Screen options={{
                ...TransitionPresets.ModalTransition,
            }} name="GalleryChooser" component={GalleryChooser} />
          <RootStack.Screen options={{
                animationEnabled: false,
                cardStyle: { backgroundColor: 'transparent' }
            }} name="Logout" component={Logout} />
          <RootStack.Screen name="ProfileX" component={ProfileXScreen} />
          <RootStack.Screen options={{
                ...TransitionPresets.ModalTransition,
            }} name="StoryCreate" component={StoryCreate} />
          <RootStack.Screen options={{
                ...TransitionPresets.ModalTransition,
            }} component={StoryProcessor} name="StoryProcessor" />
          <RootStack.Screen options={{
                ...TransitionPresets.ModalTransition,
            }} component={StoryPreCreate} name="StoryPreCreate" />

        </RootStack.Navigator>
      </NavigationContainer>
  )
}

export default index
