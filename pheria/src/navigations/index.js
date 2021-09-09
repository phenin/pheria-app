import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import RootTab from './RootTab';
import { navigationRef } from './rootNavigation';
import Comment from '../screens/Root/Comment';
import StoryTaker from '../screens/Others/StoryTaker';
import EditProfile from '../screens/Home/Account/EditProfile';
import GalleryChooser from '../screens/Home/Account/GalleryChooser';

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
            }} name="StoryTaker" component={StoryTaker} />
          <RootStack.Screen options={{
                ...TransitionPresets.ModalTransition,
            }} name="GalleryChooser" component={GalleryChooser} />
        </RootStack.Navigator>
      </NavigationContainer>
  )
}

export default index
