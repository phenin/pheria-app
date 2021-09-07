import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabBarComponent } from '../components/BottomTabBar'
import HomeIndex from '../screens/Home'
import Account from '../screens/Home/Account'
import CustomAccountIcon from '../components/CustomTabIcons/CustomAccountIcon'

const Stack = createStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false
        }}>
            <Stack.Screen component={HomeIndex} name="HomeIndex" />
            
        </Stack.Navigator>
    )
}

const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false
        }}>
            <Stack.Screen component={Account} name="AccountIndex" />
        </Stack.Navigator>
    )
}


const Tab = createBottomTabNavigator()

const HomeTab = () => {
    const tabBarOptions = {
        showLabel: false,
    }
    const navigationOptions = {
        headerShown: false,
    }
    return (
        <Tab.Navigator tabBar={TabBarComponent} tabBarOptions={tabBarOptions} screenOptions={navigationOptions}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => <Icon name="home"
                        size={30} color={focused ? '#000' : '#ddd'} />
                }} component={HomeStack} name="HomeIndex" />
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => <CustomAccountIcon focused={focused} />
            }} component={AccountStack} name="Account" />
        </Tab.Navigator>
    )
}

export default HomeTab