import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import StoryItem from './StoryItem'

const index = ({ data, showCommentInput }) => {
    useEffect(() => {
    }, [])
    return (
        <View style={styles.container}>
            {data.map((story, index) => (
                <StoryItem
                    showCommentInput={showCommentInput}
                    key={index} item={story} />
            ))}
        </View>
    )
}

export default React.memo(index)

const styles = StyleSheet.create({
    container: {

    }
})
