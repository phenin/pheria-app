import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ExtraPost } from '../../reducers/postReducer'
import { timestampToString } from '../../utils/util'

const CommentItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{ uri: item?.author?.picture }} />
            <View style={{
                marginLeft: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                            {item?.author?.name || '-NaN-'} </Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>{item?.title}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        color: '#666'
                    }}>{timestampToString(item?.datecreate || 0)}</Text>
                </View>
            </View>
        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#fff',
        borderWidth: 0.8
    }
})
