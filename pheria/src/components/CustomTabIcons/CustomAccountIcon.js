import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated, Image } from 'react-native'
import { useSelector } from '../../reducers'
import { store } from '../../store'
import { getTabBarHeight } from '../BottomTabBar'

const CustomAccountIcon = ({ focused }) => {
    const user = useSelector(state => state.user.user.userInfo)
    const collectionAll = (useSelector(state =>
        state.user.bookmarks?.find(x => x.name === 'All Posts')
    ) || { bookmarks: [] })
    const _anim = React.useMemo(() => new Animated.Value(0), [])
    const ref = useRef({
        preBoormarkCount: store.getState().user.bookmarks
            ?.find(x => x.name === 'All Posts')?.bookmarks.length || 0,
        animating: false
    })
    useEffect(() => {
        const nextCount = collectionAll.bookmarks.length
        if (nextCount > ref.current.preBoormarkCount && !ref.current.animating) {
            ref.current.animating = true
            _onAnimation()
        }
        ref.current.preBoormarkCount = nextCount
    }, [collectionAll])

    const _onAnimation = () => {
        Animated.sequence([
            Animated.timing(_anim, {
                duration: 500,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.delay(3000)
            ,
            Animated.timing(_anim, {
                duration: 400,
                toValue: 0,
                useNativeDriver: true
            })
        ]).start(() => ref.current.animating = false)
    }
    return (
        <React.Fragment>
            <Animated.View style={{
                ...styles.popupBookmark,
                transform: [{
                    scale: _anim
                }],
            }}>
                <Image
                    source={{
                        uri: [...collectionAll.bookmarks].pop()?.previewUri
                    }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </Animated.View>
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 24,
                padding: 2,
                borderWidth: focused ? 1 : 0
            }}>
                <Image style={styles.avatar} source={{
                    uri: user?.avatarURL
                }} />
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
    popupBookmark: {
        position: 'absolute',
        backgroundColor: 'red',
        height: 50,
        width: 50,
        borderRadius: 5,
        overflow: 'hidden',
        top: -60,
        borderColor: "#ddd",
        borderWidth: 0.5
    }
})
