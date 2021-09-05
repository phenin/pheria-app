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
                        <Text style={{ fontWeight: 'bold' }}>
                            {item?.author?.name || '-NaN-'} </Text>
                    </TouchableOpacity>
                    <Text>{item?.title}</Text>
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
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30
    }
})
