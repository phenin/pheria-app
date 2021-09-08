import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useSelector } from '../../reducers'

const CustomAccountIcon = ({ focused }) => {
    const user = useSelector(state => state.user.user.userInfo)
    
    return (
        <React.Fragment>
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 24,
                padding: 2,
                borderWidth: focused ? 1 : 0
            }}>
                <Image style={styles.avatar} source={
                    user.picture ? {uri: user?.picture }: require('../../assets/icons/account.png') } />
            </View>
        </React.Fragment >
    )
}

export default CustomAccountIcon

const styles = StyleSheet.create({
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        borderColor: '#000',
    },
})
