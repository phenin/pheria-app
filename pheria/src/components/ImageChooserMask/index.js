import React from 'react'
import { StyleSheet, View } from 'react-native'

const ImageChooserMask = (
    { width, height, maskColor }) => {
    return (
        <View style={{
            width,
            height,
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderColor: maskColor,
            borderWidth: 1,
        }}>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((x, index) => (
                <View key={index} style={{
                    width: width / 3 - 2 / 3,
                    height: height / 3 - 2 / 3,
                    borderColor: maskColor,
                    borderWidth: 1
                }} />
            ))}
        </View>
    )
}

export default ImageChooserMask

const styles = StyleSheet.create({})
