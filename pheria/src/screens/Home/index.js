import React, { useEffect, useRef, useState } from 'react'
import {
    Animated, NativeScrollEvent,
    NativeSyntheticEvent, RefreshControl,
    SafeAreaView, ScrollView, StyleSheet,
    Text, View, KeyboardAvoidingView, Keyboard, TextInput,
    TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import { FetchStoryListRequest, LoadMoreStoryListRequest } from '../../actions/storyActions'
import HomeNavigationBar from '../../components/HomeNavigationBar'
import { SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'
import { useSelector } from '../../reducers'
import StoryList from '../../components/StoryList/'

const index = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const storyList = useSelector(state => state.storyList)
    const _loadingDeg = new Animated.Value(0)
    const _scrollRef = useRef(null)
    const [loadingMore, setLoadingMore] = useState(false)
    const [showCommentInput, setShowCommentInput] = useState(false)

    const ref = useRef({
        scrollHeight: 0, preOffsetY: 0,
        commentContents: [], currentCommentId: 0
    })
    const [refreshing, setRefreshing] = useState(false)
    const _startAnimateLoading = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start(() => {
            _loadingDeg.setValue(0)
            _startAnimateLoading()
        })
    }
    const _onScroll = ({ nativeEvent: {
        contentOffset: { y }, contentSize: { height }
    } }) => {
        if (y / height > 0.45
            && y > ref.current.preOffsetY
            && !loadingMore && !refreshing
        ) {
            (async () => {
                setLoadingMore(true)
                // await dispatch(LoadMoreStoryListRequest())
                setLoadingMore(false)
            })()
        }
        ref.current.preOffsetY = y
    }
    useEffect(() => {
        (async () => {
            setRefreshing(true)
            await dispatch(FetchStoryListRequest())
            setRefreshing(false)
        })()
    }, [user])
    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            setShowCommentInput(false)
        })
        dispatch(FetchStoryListRequest())
    }, [])
    const _onRefresh = async () => {
        setRefreshing(true)
        await dispatch(FetchStoryListRequest())
        setRefreshing(false)
    }
    const _showCommentInput = React.useCallback((id, prefix) => {
        if (id !== 0) {
            const check = ref.current.commentContents.every((x, index) => {
                if (x.id === id) {
                    if (prefix) {
                        ref.current.commentContents[index].content = prefix
                    }
                    return false
                }
                return true
            })
            if (check) {
                ref.current.commentContents.push({
                    id: id,
                    content: prefix || ''
                })
            }
            ref.current.currentCommentId = id
            setShowCommentInput(true)
        }
    }, [])
    const _setCommentContents = (id, content) => {
        ref.current.commentContents.filter(x => x.id === id)[0].content = content
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingViewContainer} behavior="height">
                <HomeNavigationBar />
                <ScrollView
                    keyboardDismissMode="on-drag"
                    ref={_scrollRef}
                    style={{
                        height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44 
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                    scrollEventThrottle={10}
                    onScroll={_onScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <StoryList showCommentInput={_showCommentInput} data={storyList} />
                    <View style={{
                        ...styles.loadingIcon,
                        opacity: loadingMore ? 1 : 0
                    }}>
                        {loadingMore && <>
                            <Animated.Image
                                onLayout={_startAnimateLoading}
                                style={{
                                    width: 30,
                                    height: 30,
                                    transform: [
                                        {
                                            rotate: _loadingDeg.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg']
                                            })
                                        }
                                    ]
                                }}
                                source={require('../../assets/icons/waiting.png')} />
                            <Text style={{
                                fontWeight: '500',
                                marginLeft: 5
                            }}>Loading more...</Text></>}
                    </View>
                    
                </ScrollView>
                
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    keyboardAvoidingViewContainer: {
        position: "relative"
    },
    scrollContainer: {

    },
    loadingIcon: {
        position: 'relative',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
