import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import Welcome from '../screens/Auth/Welcome'

const Stack = createStackNavigator()
const AuthStack = () => {
    const navigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Register} name="Register" />
            <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
            <Stack.Screen component={Welcome} name="Welcome" />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})
