import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import StoryItem from './StoryItem'

const index = ({ data, showCommentInput }) => {

    useEffect(() => {
    }, [])
    return (
        <View style={styles.container}>
            {data.map((post, index) => (
                <StoryItem
                    showCommentInput={showCommentInput}
                    key={index} item={post} />
            ))}
        </View>
    )
}

export default React.memo(index)

const styles = StyleSheet.create({
    container: {

    }
})
