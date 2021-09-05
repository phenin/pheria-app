import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RootTab from './RootTab';
import { navigationRef } from './rootNavigation';
import Comment from '../screens/Root/Comment';

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
        </RootStack.Navigator>
      </NavigationContainer>
  )
}

export default index
