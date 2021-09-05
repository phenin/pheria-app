import React, { RefObject, useEffect, useRef, useState } from 'react'
import { Animated, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { StoryReplyRequest, StoryCommentRequest } from '../../actions/commentActions'
import { SCREEN_WIDTH } from '../../constants'
import { useSelector } from '../../reducers'

const index = ({ commentInputRef, preValue,
    replyToCommentId, replyToCommentUsername, onDone,
    setCommentContents, id }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const ref = useRef({ isReplying: false })
    const [text, setText] = useState(preValue || '')
    const [commenting, setCommenting] = useState(false)
    const _loadingDeg = React.useMemo(() => new Animated.Value(0), [])
    const [topOffset, setTopOffset] = useState(0)
    const _onAnimatedLoading = () => {
        Animated.timing(_loadingDeg, {
            toValue: 5,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {
        if (replyToCommentId && replyToCommentId !== 0) {
            ref.current.isReplying = true
            setTopOffset(-36)
        }
    }, [replyToCommentId])
    useEffect(() => {
        if (preValue !== undefined) {
            setText(preValue)
        }
    }, [preValue])
    const _addEmoji = (icon) => {
        setText(`${text}${icon}`)
        if (setCommentContents) setCommentContents(id, `${text}${icon}`)
    }
    const _onHideReplyLabel = () => {
        ref.current.isReplying = false
        setTopOffset(0)
    }
    const _storyComment = async () => {

        setCommenting(true)
        if (ref.current.isReplying && replyToCommentId) {
            await dispatch(StoryReplyRequest(replyToCommentId, text))
            
            _onHideReplyLabel()
            setCommenting(false)
            setText('')
            if (onDone) onDone()

        } else {
            await dispatch(StoryCommentRequest(id, text))
            
            setCommenting(false)
            setText('')
            if (onDone) onDone()
            if (setCommentContents) setCommentContents(id, '')
        }

    }

    return (
        <View style={styles.commentInputWrapper}>
            <Animated.View style={{
                ...styles.replyLabelWrapper,
                top: topOffset
            }}>
                <Text style={{
                    color: "#666"
                }}>
                    Replying to {replyToCommentUsername}
                </Text>
                <TouchableOpacity
                    onPress={_onHideReplyLabel}
                    style={styles.btnHideReplyLabel}>
                    <Text style={{
                        color: "#666",
                        fontSize: 20
                    }}>×</Text>
                </TouchableOpacity>
            </Animated.View>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{
                    height: 36,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    borderTopColor: "#ddd",
                    borderTopWidth: 1,
                    backgroundColor: '#fff'
                }}
                bounces={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={_addEmoji.bind(null, '❤')} style={styles.iconItem}>
                    <Text style={styles.icon}>❤</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '🙌')} style={styles.iconItem}>
                    <Text style={styles.icon}>🙌</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😎')} style={styles.iconItem}>
                    <Text style={styles.icon}>😎</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😉')} style={styles.iconItem}>
                    <Text style={styles.icon}>😉</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😅')} style={styles.iconItem}>
                    <Text style={styles.icon}>😅</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😀')} style={styles.iconItem}>
                    <Text style={styles.icon}>😀</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😃')} style={styles.iconItem}>
                    <Text style={styles.icon}>😃</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😊')} style={styles.iconItem}>
                    <Text style={styles.icon}>😊</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😋')} style={styles.iconItem}>
                    <Text style={styles.icon}>😋</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😋')} style={styles.iconItem}>
                    <Text style={styles.icon}>🤧</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_addEmoji.bind(null, '😮')} style={styles.iconItem}>
                    <Text style={styles.icon}>😮</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.inputWrapper}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image style={styles.avatar} source={{
                        uri: user.userInfo?.avatarURL,
                        cache: 'force-cache'
                    }} />
                    <TextInput
                        value={text}
                        onChangeText={e => {
                            if (setCommentContents) setCommentContents(id, e)
                            setText(e)
                        }}
                        placeholder="Add a comment..."
                        onLayout={() => commentInputRef.current?.focus()}
                        ref={commentInputRef}
                        style={styles.commentInput} />
                </View>
                <TouchableOpacity
                    disabled={commenting || text.length === 0}
                    onPress={_storyComment}
                    style={styles.btnStory}>
                    {!commenting && <Text style={{
                        color: '#1b6563cc',
                        fontWeight: '600'
                    }}>POST</Text>}
                    {commenting && <Animated.Image
                        onLayout={_onAnimatedLoading}
                        style={{
                            height: 30,
                            width: 30,
                            transform: [{
                                rotate: _loadingDeg.interpolate({
                                    inputRange: [0, 5],
                                    outputRange: ['0deg', '1800deg']
                                })
                            }]
                        }}
                        source={require('../../assets/icons/waiting.png')}
                    />}
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default React.memo(index)

const styles = StyleSheet.create({
    commentInputWrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff"
    },
    iconItem: {
        height: 36,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 18
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    commentInput: {
        paddingHorizontal: 10,
        height: 44,
        width: SCREEN_WIDTH - 30 - 30 - 40,
        fontSize: 16
    },
    btnStory: {
        width: 40
    },
    replyLabelWrapper: {
        height: 36,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        position: 'absolute',
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ddd'
    },
    btnHideReplyLabel: {
    }
})
