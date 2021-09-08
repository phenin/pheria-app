import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useSelector } from '../reducers';
import Direct from '../screens/Others/Direct';
import AuthStack from './AuthStack';
import HomeTab from './HomeTab';

const RootTab = createMaterialTopTabNavigator()
const index = () => {
    const user = useSelector(state => state.user)
    const navigationOptions = {
    }
    const tabBarOptions = {
        indicatorContainerStyle: {
            display: 'none'
        },
        tabStyle: {
            display: 'none'
        }
    }
    const logined = !!user?.user?.userInfo
    return (
        <RootTab.Navigator
            initialRouteName={logined ? 'HomeTab' : 'AuthStack'}
            screenOptions={navigationOptions}
            tabBarOptions={tabBarOptions}
            >
            {!logined &&
                <RootTab.Screen name="AuthStack" component={AuthStack} />
            }
            {logined &&
                <>
                    <RootTab.Screen name="HomeTab" component={HomeTab} />
                    <RootTab.Screen name="Direct" component={Direct} />
                </>
            }

        </RootTab.Navigator>
    )
}
export default index

