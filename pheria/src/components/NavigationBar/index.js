import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const NavigationBar = ({ callback, title }) => {
    const _onCallBack = () => {
        if (callback) callback()
    }
    return (
        <View style={styles.navigationBar}>
            <TouchableOpacity
                onPress={_onCallBack}
                style={styles.btnBack}>
                <Icon name="arrow-left" style={{color: '#fff'}} size={20} />
            </TouchableOpacity>
            <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#fff'
            }}>{title}</Text>
        </View>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: '#000',
        flexDirection: 'row',
        height: 44,
        width: '100%',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    btnBack: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
