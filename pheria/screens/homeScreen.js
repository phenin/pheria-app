import * as React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Octicons';
import UserScreen from './userScreen';
import ListStoryScreen from './listStoryScreen';
import CreateStoryScreen from './createStoryScreen';
import {getUser} from '../store/actions/userActions'
import {useDispatch} from 'react-redux';

const Tabs = AnimatedTabBarNavigator();

function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(getUser())
  },[])

  return (
    <Tabs.Navigator
      initialRouteName="Home"
      appearance={{
        floating: true,
      }}
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#000',
        inactiveTintColor: '#000',
      }}>
      <Tabs.Screen
        name="Home"
        component={ListStoryScreen}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : '#000'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateStory"
        component={CreateStoryScreen}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="plus"
              size={size ? size : 24}
              color={focused ? color : '#000'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="person"
              size={size ? size : 24}
              color={focused ? color : '#000'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default HomeScreen;
