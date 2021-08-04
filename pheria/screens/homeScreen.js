import * as React from 'react';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/Octicons';
import UserScreen from "./userScreen"
import ListStoryScreen from "./listStoryScreen"
import CreateStoryScreen from "./createStoryScreen"

const Tabs = AnimatedTabBarNavigator();

function HomeScreen({ navigation }) {

  return (
    <Tabs.Navigator initialRouteName="Home"
      appearance={{
        floating: true,
      }}
      tabBarOptions={{
        activeTintColor: "#fff",
        activeBackgroundColor: "#000",
        inactiveTintColor: "#000",

      }}
    >
      <Tabs.Screen name="Home" component={ListStoryScreen}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            console.log('sss')
            e.preventDefault();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : "#000"}
              focused={focused}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen name="CreateStory" component={CreateStoryScreen}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="plus"
              size={size ? size : 24}
              color={focused ? color : "#000"}
              focused={focused}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen name="User" component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
              <Icon
                  name="person"
                  size={size ? size : 24}
                  color={focused ? color : "#000"}
                  focused={focused}
                  color={color}
              />
          )
        }}
      />
    </Tabs.Navigator>
  );
}

export default HomeScreen;
