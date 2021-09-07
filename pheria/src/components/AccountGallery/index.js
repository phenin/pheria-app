import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import GalleryImageItem from '../GalleryImageItem'

const AccountGallery = ({ photos, hidePopupImage, showPopupImage }) => {
    return (
        <View style={styles.container}>
            {photos && photos.map((photo, index) => (
                <GalleryImageItem
                    _hidePopupImage={hidePopupImage}
                    _showPopupImage={showPopupImage}
                    key={index}
                    index={index}
                    photo={photo} />
            ))}
        </View>
    )
}

export default AccountGallery

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        backgroundColor: '#fff',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
})
