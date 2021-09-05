import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { default as Icon, default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { ToggleLikeStoryRequest } from '../../actions/storyActions'
import { navigate, navigation } from '../../navigations/rootNavigation'
import { useSelector } from '../../reducers'
import { store } from '../../store'
import { timestampToString } from '../../utils/util'
import PhotoShower from './PhotoShower'

const StoryItem = ({ setStory, item }) => {
    const dispatch = useDispatch()
    const myUsername = store.getState().user.user.userInfo?.name
    const user = useSelector(state => state.user.user)
    const isLiked = item.hearts && item.hearts?.indexOf(user.userInfo?._id || '') > -1
    const isViewed = item.views && item.views?.indexOf(user.userInfo?._id || '') > -1

    const _toggleLikeStory = () => {
        dispatch(ToggleLikeStoryRequest(item._id || 0, isLiked))
    }
    let diffTime = timestampToString(item.datecreate || 0, true)
    const _onViewAllComments = () => {
        // navigation.navigate('Comment', {
        //     storyId: item._id,
        //     ...(setStory ? { storyData: { ...item } } : {})
        // })
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.storyHeader}>
                <TouchableOpacity
                    onPress={() => myUsername === item.author?.name ?
                        navigate('AccountIndex')
                        : navigate('ProfileX', {
                            name: item.author?.name
                        })}
                    style={styles.infoWrapper}>
                    <Image style={styles.avatar}
                        source={item.author?.picture? { uri: item.author?.picture }:require('../../assets/icons/account.png') }
                         />
                    <Text style={{
                        fontWeight: '600',
                        color: '#fff'
                    }}>{item.author?.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    navigation.push('StoryOptions', {
                        item,
                        setStory
                    })}>
                    <Icons name="dots-vertical" size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <PhotoShower sources={[{uri:item.image}] || []} />
            </View>
            <View style={styles.titleStory}>
                <Text style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#fff'
                    }}>{item.title}</Text>
            </View>
            <View style={styles.reactionsWrapper}>
                <View style={styles.reactions}>
                    <View style={styles.lReactions}>
                        
                        <TouchableOpacity
                            onPress={_toggleLikeStory}
                        >
                            <Icons name={isLiked
                                ? "heart" : "heart-outline"}
                                size={24}
                                color={
                                    isLiked ? 'red' : '#fff'
                                } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_onViewAllComments}>
                            <Icon name="comment-outline" color={'#fff'} size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icons name="eye"
                                size={24}
                                color={
                                    isViewed ? '#fff' : '#ddd'
                                } />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5
                }}>
                    {item.views && item.views.length !== 0 && <Text style={{
                        fontWeight: "bold",
                        marginRight: 10,
                        color: '#fff'
                    }}>{item.views.length >= 1000 ?
                        (Math.round(item.views.length / 1000) + 'k')
                        : item.views.length} Lượt xem</Text>}

                    {item.hearts && item.hearts.length !== 0 && <Text style={{
                        fontWeight: "bold",
                        marginRight: 10,
                        color: '#fff'
                    }}>{item.hearts.length >= 1000 ?
                        (Math.round(item.hearts.length / 1000) + 'k')
                        : item.hearts.length} Lượt thích</Text>}
                </View>
                

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: '#666'
                    }}>{diffTime}</Text>
                </View>
            </View>
        </View >
    )
}

export default React.memo(StoryItem)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    },
    storyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 0.5,
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        overflow: 'hidden'
    },
    avatar: {
        borderColor: '#fff',
        borderWidth: 0.3,
        height: 36,
        width: 36,
        borderRadius: 36,
        marginRight: 10,
    },
    titleStory: {
        padding: 10,
    },
    reactionsWrapper: {
        padding: 10
    },
    reactions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lReactions: {
        flexDirection: 'row',
        width: 24.3 * 3 + 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
})