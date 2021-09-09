import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { FetchExtraInfoRequest } from '../../../actions/userActions'
import { getTabBarHeight } from '../../../components/BottomTabBar'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../../constants'
import { navigate } from '../../../navigations/rootNavigation'
import { useSelector } from '../../../reducers'
import HighlightPreviewList from '../../../components/Highlight/HighlightPreviewList'

const index = () => {
    const dispatch = useDispatch()
    const [selectedPhoto, setSelectedPhoto] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    const userState = useSelector(state => state.user)
    const user = userState.user
    const highlights = [...(userState.highlights || [])]
    highlights.reverse()
    const extraInfo = useSelector(state => state.user.extraInfo)
    const archivePosts = useSelector(state => state.user.archive?.posts || [])
    // const photos = useSelector(state => state.user.photos || [])
        .filter(x => !!!archivePosts.find(y => y.uid === x.uid))
    const scrollHRef = useRef(null)
    const scrollVRef = useRef(null)
    const scrollTabRef = useRef(null)
    const _headerTabOpacity = React.useMemo(() => new Animated.Value(-1), [])
    const ref = useRef({
        showHeaderTab: false,
        headerHeight: 0,
        currentTab: 1,
        currentGalleryTab: 1,
        prePopupImage: { pX: 0, pY: 0, w: 0, h: 0 }
    })
    const _tabLineOffsetX = React.useMemo(() => new Animated.Value(0), [])
    
    useEffect(() => {
        // if (photos) {
        //     Image.preload(photos.map(post => ({ uri: post.source ? post.source[0].uri : '' })))
        // }
        // (async () => {
        //     setRefreshing(true)
        //     await dispatch(FetchHighlightRequest())
        //     await dispatch(FetchExtraInfoRequest())
        //     setRefreshing(false)
        // })()
    }, [])
    const _onRefreshing = () => {
        (async () => {
            setRefreshing(true)
            await dispatch(FetchExtraInfoRequest())
            setRefreshing(false)
        })()
    }
    const _scrollToPosts = () => {
        scrollVRef.current?.scrollTo({
            x: 0,
            y: ref.current.headerHeight,
            animated: true
        })
    }
    const _onShowOptions = () => {

        if (ref.current.currentTab === 1) {
            scrollHRef.current?.scrollTo({
                x: SCREEN_WIDTH / 2,
                y: 0,
                animated: true
            })
            ref.current.currentTab = 2
        } else {
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            ref.current.currentTab = 1
        }
    }
    const _onBackToMainScreen = () => {
        if (ref.current.currentTab === 2) {
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            ref.current.currentTab = 1
        }
    }
    const _onToggleGalleryTab = (tab) => {
        _onBackToMainScreen()
        if (ref.current.currentGalleryTab === 1 && tab === 2) {
            ref.current.currentGalleryTab = 2
            Animated.timing(_tabLineOffsetX, {
                toValue: SCREEN_WIDTH / 2,
                duration: 200,
                useNativeDriver: false
            }).start()
            scrollTabRef.current?.scrollTo({
                x: SCREEN_WIDTH,
                y: 0,
                animated: true
            })
        } else if (ref.current.currentGalleryTab === 2 && tab === 1) {
            ref.current.currentGalleryTab = 1
            Animated.timing(_tabLineOffsetX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
            scrollTabRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        }
    }
    
    const _onScrollEndDragContainerScroll = ({ nativeEvent: {
        contentOffset: { x }
    } }) => {
        if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
            ref.current.currentTab = 2
            scrollHRef.current?.scrollTo({
                x: SCREEN_WIDTH / 2,
                y: 0,
                animated: true
            })
        } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
            ref.current.currentTab = 1
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
            scrollHRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
        } else if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
            scrollHRef.current?.scrollTo({
                x: SCREEN_WIDTH / 2,
                y: 0,
                animated: true
            })
        }
    }
    const _onScrollEndDragGalleryTabScroll = ({ nativeEvent: {
        contentOffset: { x }
    } }) => {
        _onBackToMainScreen()
        if (x > SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 1) {
            ref.current.currentGalleryTab = 2
            scrollTabRef.current?.scrollTo({
                x: SCREEN_WIDTH,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: SCREEN_WIDTH / 2,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else if (x < SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 2) {
            ref.current.currentGalleryTab = 1
            scrollTabRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else if (x < SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 1) {
            scrollTabRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else if (x > SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 2) {
            scrollTabRef.current?.scrollTo({
                x: SCREEN_WIDTH,
                y: 0,
                animated: true
            })
            Animated.timing(_tabLineOffsetX, {
                toValue: SCREEN_WIDTH / 2,
                duration: 200,
                useNativeDriver: false
            }).start()
        }
    }
    const _showPopupImage = (e, photo) => {
        ref.current.prePopupImage = e
        setSelectedPhoto(photo)
    }
    const _hidePopupImage = () => {
        Animated.timing(_popupImageTop, {
            toValue: ref.current.prePopupImage.pY - 44 - 40,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(_popupImageLeft, {
            toValue: ref.current.prePopupImage.pX,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(_popupImageWidth, {
            toValue: ref.current.prePopupImage.w,
            duration: 150,
            useNativeDriver: false
        }).start()
        Animated.timing(_popupImageHeight, {
            toValue: ref.current.prePopupImage.h,
            duration: 150,
            useNativeDriver: false
        }).start(() => setSelectedPhoto({}))

    }
    const _popupImageTop = new Animated.Value(0)
    const _popupImageLeft = new Animated.Value(0)
    const _popupImageWidth = new Animated.Value(0)
    const _popupImageHeight = new Animated.Value(0)
    const _onAnimatePopup = ({ nativeEvent }) => {
        if (selectedPhoto.source) {
            Image.getSize(selectedPhoto.source[0].uri, (xwidth, xheight) => {
                const nextHeight = xheight * 0.9 * SCREEN_WIDTH / xwidth
                _popupImageTop.setValue(ref.current.prePopupImage.pY - 44)
                _popupImageLeft.setValue(ref.current.prePopupImage.pX)
                _popupImageWidth.setValue(ref.current.prePopupImage.w)
                _popupImageHeight.setValue(ref.current.prePopupImage.h)
                Animated.spring(_popupImageTop, {
                    toValue: (nativeEvent.layout.height - nextHeight) / 2,
                    useNativeDriver: false
                }).start()
                Animated.spring(_popupImageLeft, {
                    toValue: (nativeEvent.layout.width - 0.9 * SCREEN_WIDTH) / 2,
                    useNativeDriver: false
                }).start()
                Animated.spring(_popupImageWidth, {
                    toValue: 0.9 * SCREEN_WIDTH,
                    useNativeDriver: false
                }).start()
                Animated.spring(_popupImageHeight, {
                    toValue: nextHeight,
                    useNativeDriver: false
                }).start()

            }, Function)
        }



    }
    const _onSetHeaderHeight = ({ nativeEvent: { layout: { height } } }) => {
        ref.current.headerHeight = height
    }
    const _onVerticalScrollViewScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
        if (y > ref.current.headerHeight) {
            if (!ref.current.showHeaderTab) {
                _headerTabOpacity.setValue(1)
                ref.current.showHeaderTab = true
            }
        } else {
            if (ref.current.showHeaderTab) {
                _headerTabOpacity.setValue(-1)
                ref.current.showHeaderTab = false
            }
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            
            <ScrollView
                onScrollEndDrag={_onScrollEndDragContainerScroll}
                ref={scrollHRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            >
                <View
                    style={styles.profileContainer}>
                    <Animated.View style={{
                        ...styles.profileHeader,
                        zIndex: _headerTabOpacity
                    }}>
                        {/* <TouchableOpacity
                            style={styles.btnSwitchAccount}>
                            
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={_onShowOptions}
                            style={styles.btnOptions}>
                            <Icon name="menu" size={24} />
                        </TouchableOpacity>
                        <Animated.View style={{
                            ...styles.galleryTabWrapper,
                            position: 'absolute',
                            left: 0,
                            top: '100%',
                            backgroundColor: 'rgb(250,250,250)',
                            opacity: _headerTabOpacity,
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={_onToggleGalleryTab.bind(null, 1)}
                                style={styles.galleryTab}>
                                <Icon name="grid" size={24} color="#333" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={_onToggleGalleryTab.bind(null, 2)}
                                style={styles.galleryTab}>
                                <Icon name="tooltip-image-outline" size={24} color="#333" />
                            </TouchableOpacity>
                            <Animated.View style={{
                                ...styles.tabLine,
                                left: _tabLineOffsetX
                            }} />
                        </Animated.View>
                    </Animated.View>
                    <ScrollView
                        ref={scrollVRef}
                        onScroll={_onVerticalScrollViewScroll}
                        scrollEventThrottle={20}
                        refreshControl={<RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefreshing}
                        />}
                        style={{
                            width: '100%'
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={_onBackToMainScreen}>
                            <View onLayout={_onSetHeaderHeight}>
                                <View style={styles.infoWrapper}>
                                    <TouchableOpacity
                                        onPress={() => navigate('StoryTaker')}
                                        style={styles.avatarWrapper}>
                                        <Image style={styles.mainAvatar}
                                            source={user?.userInfo?.picture
                                                ?{ uri: user?.userInfo?.picture }
                                                :require('../../../assets/icons/account_x2.png')} />
                                    </TouchableOpacity>
                                    <View style={styles.extraInfoWrapper}>
                                        <TouchableOpacity
                                            onPress={_scrollToPosts}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: "500"
                                            }}>{extraInfo?.posts}</Text>
                                            <Text>Posts</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigate('Follow', { type: 1 })
                                            }}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: "500"
                                            }}>{extraInfo?.followers.length}</Text>
                                            <Text>Followers</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigate('Follow', { type: 2 })
                                            }}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: "500"
                                            }}>{extraInfo?.followings.length}</Text>
                                            <Text>Following</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.bioWrapper}>
                                    <Text style={{
                                        fontWeight: '500',
                                    }}>{user.userInfo?.name}</Text>
                                    <Text>{user.userInfo?.bio}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigate('EditProfile')}
                                    activeOpacity={0.6}
                                    style={styles.btnEditProfile}>
                                    <Text style={{
                                        fontWeight: '500'
                                    }}>Edit Profile</Text>
                                </TouchableOpacity>
                                {highlights.length > 0 &&
                                    <HighlightPreviewList
                                        showAdder={true}
                                        highlights={highlights} />
                                }
                            </View>
                            <View style={styles.galleryContainer}>
                                <View style={styles.galleryTabWrapper}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={_onToggleGalleryTab.bind(null, 1)}
                                        style={styles.galleryTab}>
                                        <Icon name="grid" size={24} color="#333" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={_onToggleGalleryTab.bind(null, 2)}
                                        style={styles.galleryTab}>
                                        <Icon name="tooltip-image-outline" size={24} color="#333" />
                                    </TouchableOpacity>
                                    <Animated.View style={{
                                        ...styles.tabLine,
                                        left: _tabLineOffsetX
                                    }} />
                                </View>
                                <ScrollView
                                    onScrollEndDrag={_onScrollEndDragGalleryTabScroll}
                                    bounces={false}
                                    ref={scrollTabRef}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 5,
                                            flexDirection: 'row'
                                        }}
                                        activeOpacity={1}
                                    >
                                        {/* <AccountGallery
                                            photos={photos || []}
                                            hidePopupImage={_hidePopupImage}
                                            showPopupImage={_showPopupImage}
                                        />
                                        */}
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                            
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.profileOptions}>
                    <View style={styles.profileOptionsHeader}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500'
                        }}>{user.userInfo?.name}</Text>
                    </View>
                    <View style={styles.optionsWrapper}>
                        <TouchableOpacity
                            onPress={() => navigate('Archive')}
                            activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="history" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Archive</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="camera-timer" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Your Activity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="qrcode-scan" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Nametag</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('Saved')}
                            activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="bookmark-outline" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Saved</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('CloseFriends')}
                            activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="playlist-star" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Close Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigate('DiscoverPeople')}
                            activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="account-plus-outline" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Discover People</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={_onBackToMainScreen}
                            activeOpacity={0.8} style={styles.optionItem}>
                            <Icon name="arrow-left" size={30} color="#333" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 5,
                            }}>Back</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('Setting')
                            setTimeout(() => {
                                _onBackToMainScreen()
                            }, 1000);
                        }}
                        activeOpacity={0.8}
                        style={{
                            ...styles.optionItem,
                            position: 'absolute',
                            left: 0,
                            borderTopColor: '#ddd',
                            borderTopWidth: 0.3,
                            bottom: getTabBarHeight() + STATUS_BAR_HEIGHT
                        }}>
                        <Icon name="cogs" size={30} color="#333" />
                        <Text style={{
                            fontSize: 16,
                            marginLeft: 5,
                        }}>Setting</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(250,250,250)',
        width: '100%',
        height: '100%'
    },
    profileContainer: {
        width: SCREEN_WIDTH
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        width: '100%'
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    avatarWrapper: {
        position: 'relative'
    },
    mainAvatar: {
        height: 80,
        width: 80,
        borderRadius: 80
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 30 - 80,
        justifyContent: 'space-evenly'
    },
    bioWrapper: {
        paddingHorizontal: 15,
        marginVertical: 10
    },
    btnEditProfile: {
        marginVertical: 10,
        width: SCREEN_WIDTH - 30,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 3,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    galleryContainer: {
        width: '100%'
    },
    galleryTabWrapper: {
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
        borderTopColor: '#ddd',
        borderTopWidth: 0.5
    },
    galleryTab: {
        width: SCREEN_WIDTH * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    tabLine: {
        bottom: -1,
        height: 2,
        backgroundColor: '#000',
        position: 'absolute',
        width: SCREEN_WIDTH / 2
    },
    
    profileOptions: {
        width: SCREEN_WIDTH / 2,
        height: SCREEN_HEIGHT,
        backgroundColor: '#fff',
        borderLeftColor: '#ddd',
        borderLeftWidth: 0.3,
        borderTopColor: '#ddd',
        borderTopWidth: 0.3,
    },
    profileOptionsHeader: {
        height: 44,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.3,
    },
    optionsWrapper: {
        backgroundColor: "#000",
        width: '100%',
    },
    optionItem: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        height: 44,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnOptions: {
        flexDirection: 'row',
        width: '100%',
        height: 44,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
    }
})
