import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Animated, FlatList, View, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import CommentItem from './CommentItem'
import PostContentItem from './PostContentItem'
import { useSelector } from '../../reducers'
import { SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'
import { useDispatch } from 'react-redux'
import {
    FetchCommentListRequest,
    ResetCommentList,
    LoadMoreCommentListRequest
} from '../../actions/commentActions'

const index = ({ storyId, onReply }) => {
    const dispatch = useDispatch()
    const comment = useSelector(state => state.comment)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const ref = useRef({ preOffsetY: 0 })
    const scrollRef = useRef(null)
    useEffect(() => {
        (async () => {
            setRefreshing(true)
            await dispatch(FetchCommentListRequest(storyId))
            setRefreshing(false)
        })()

        return () => {
            dispatch(ResetCommentList())
        }
    }, [])
    useEffect(() => {
        if (comment.scrollDown) {
            scrollRef.current?.scrollToEnd()
        }
    }, [comment])
    const _onRefresh = async () => {
        if (!refreshing) {
            setRefreshing(true)
            await dispatch(FetchCommentListRequest(storyId))
            setRefreshing(false)
        }
    }
    const _onLoadMore = async () => {
        if (!loadingMore) {
            setLoadingMore(true)
            await dispatch(LoadMoreCommentListRequest(storyId))
            setLoadingMore(false)
        }
    }
    const _onScrollHandler = ({ nativeEvent }) => {
        const offsetPercent = (nativeEvent.contentSize.height
            - nativeEvent.contentOffset.y) / nativeEvent.contentSize.height
        const isScrollDown = nativeEvent.contentOffset.y - ref.current.preOffsetY > 0
        if (offsetPercent < 0.9 && isScrollDown) {
            _onLoadMore()
        }
        ref.current.preOffsetY = nativeEvent.contentOffset.y
    }
    const FooterComponent = ({ loading }) => {
        const _loadingDeg = new Animated.Value(0)
        const _onAnimateLoading = () => {
            Animated.timing(_loadingDeg, {
                toValue: 5,
                duration: 400 * 5,
                useNativeDriver: true
            }).start()
        }
        return (
            <View style={{
                marginBottom: 85,
                height: 44,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {loading && <Animated.Image
                    onLayout={_onAnimateLoading}
                    style={{
                        height: 30,
                        width: 30,
                        transform: [
                            {
                                rotate: _loadingDeg.interpolate({
                                    inputRange: [0, 5],
                                    outputRange: ['0deg', '1800deg']
                                })
                            }
                        ]
                    }}
                    source={require('../../assets/icons/waiting.png')} />}
            </View>
        )
    }
    return (
        <FlatList
            ref={scrollRef}
            style={{
                height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44,
            }}
            refreshing={refreshing}
            onRefresh={_onRefresh}
            ListHeaderComponent={() => <PostContentItem item={comment.story} />}
            ListFooterComponent={() => <FooterComponent loading={loadingMore} />}
            renderItem={({ item, index }) =>
                <CommentItem storyId={storyId}
                    onReply={onReply} item={item} />}
            keyExtractor={(item, index) => `${index}`}
            data={comment.comments}
            onScroll={_onScrollHandler}
            scrollEventThrottle={30}
        >
        </FlatList>
    )
}

export default React.memo(index)

const styles = StyleSheet.create({})
