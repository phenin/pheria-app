import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommentInputPopup from '../../components/CommentInputPopup'
import CommentList from '../../components/CommentList'
import { SuperRootStackParamList } from '../../navigations'

const index = ({ navigation, route }) => {
    const storyId = route.params.storyId
    const commentInputRef = useRef(null)
    const [currentReplyCommentId, setCurrentReplyCommentId] = useState(0)
    const [currentReplyUsername, setCurrentReplyUsername] = useState('')
    const _onGoBack = () => {
        navigation.goBack()
    }
    const _onShareToDirect = () => {

    }
    const _onReply = (commentId, targetUsername) => {
        commentInputRef.current?.focus()
        setCurrentReplyCommentId(commentId)
        setCurrentReplyUsername(targetUsername)
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="height" style={{
                position: 'relative',
            }} >
                <View style={styles.navigationBar}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={_onGoBack}
                            style={styles.btnBack}>
                            <Icons name="arrow-left" size={20} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600'
                        }}>Comments</Text>
                    </View>
                </View>
                <CommentList onReply={_onReply} storyId={storyId} />
                <CommentInputPopup
                    replyToCommentUsername={currentReplyUsername}
                    replyToCommentId={currentReplyCommentId}
                    preValue={currentReplyUsername ? `@${currentReplyUsername} ` : ''}
                    commentInputRef={commentInputRef}
                    id={storyId} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%'
    },
    navigationBar: {
        flexDirection: 'row',
        height: 44,
        width: '100%',
        justifyContent: 'space-between',
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
