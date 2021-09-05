import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { ExtraComment } from '../../reducers/commentReducer'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_WIDTH } from '../../constants'
import { useSelector } from '../../reducers'
import { timestampToString } from '../../utils/util'
import { useDispatch } from 'react-redux'
import { ToggleLikeReplyRequest } from '../../actions/commentActions'

const ReplyCommentItem = ({ storyId, item, commentId, onReply }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const isLiked = item.likes?.indexOf(user.userInfo?._id || '') !== undefined
        && item.likes?.indexOf(user.userInfo?._id || '') > -1
    const _onToggleLikeReply = () => {
        if (item?._id) {
            dispatch(ToggleLikeReplyRequest(item._id, commentId, isLiked))
        }
    }
    const _onReply = () => {
        if(item?.author?.name) {
            onReply(commentId, item.author.name || "")
        }
        
    }
    return (
        <TouchableOpacity style={{
            ...styles.container,
        }}>
            <View style={{
                flexDirection: 'row',
                maxWidth: SCREEN_WIDTH - 30 - 30 - 30 - 30
            }}>
                <TouchableOpacity>
                    <Image source={{
                        uri: item?.author?.picture
                    }} style={styles.avatar} />
                </TouchableOpacity>
                <View style={{
                    marginLeft: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <TouchableOpacity>
                            <Text style={{ fontWeight: 'bold',color: '#fff' }}>
                                {item?.author?.name} </Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff' }}>{item.content}</Text>
                    </View>
                    <View>
                        <View style={styles.infoWrapper}>
                            <Text style={{
                                color: '#666'
                            }}>{timestampToString(item?.datecreate || 0)}</Text>
                            {item.likes && item.likes.length > 0
                                && <Text style={{
                                    color: '#700',
                                    fontWeight: '600',
                                    marginHorizontal: 10
                                }}>{item.likes.length} {item.likes.length < 2 ? 'thích' : 'thích'}
                                </Text>
                            }
                            <TouchableOpacity
                                onPress={_onReply}
                            >
                                <Text style={{
                                    color: '#666',
                                    fontWeight: '600',
                                }}>Trả lời</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={_onToggleLikeReply}
                style={styles.btnLove}>
                <Icons name={isLiked ? "heart" : "heart-outline"} color={isLiked ? "red" : "#666"} size={20} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default React.memo(ReplyCommentItem)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 5,
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingLeft: 50,
        justifyContent: 'space-between'
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 0.3
    },
    btnLove: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoWrapper: {
        marginVertical: 2,
        flexDirection: 'row',
        width: 160,
        justifyContent: 'space-between'
    }
})
