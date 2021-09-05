import React, { useRef } from 'react'
import {
    ImageBackground,
    ScrollView, StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import ScaleImage from '../ScaleImage'

const PhotoShower = ({ sources }) => {
    const scrollRef = useRef(null)
    
    return (
        <View style={styles.container}>
            
            <ScrollView
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                horizontal={true}>
                {sources && sources.map((img, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                    >
                        <ImageBackground
                            source={{ uri: img.uri }}
                            blurRadius={20}
                            style={{
                                height: SCREEN_WIDTH,
                                width: SCREEN_WIDTH,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <View>
                                <ScaleImage
                                    source={{ uri: img.uri }}
                                />                                
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    )
}

export default React.memo(PhotoShower)

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    paging: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.9)',
        padding: 5,
        paddingHorizontal: 10,
        zIndex: 99,
        borderRadius: 50,
        top: 10,
        right: 10,
    },
    label: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 1,
        borderRadius: 5,
    }
})
