import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'

const index = (props) => {
    const [rwidth, setRwidth] = useState(0)
    const [rheight, setRheight] = useState(0)
    let filteredProps = { ...props }
    useEffect(() => {
        if (props.width && props.height) {
            setRwidth(props.width)
            setRheight(props.height)
        } else {
            Image.getSize(filteredProps.source.uri, (xwidth, xheight) => {
                if (props.width) {
                    setRheight(xheight * props.width / xwidth)
                    setRwidth(props.width)
                } else if (props.height) {
                    setRwidth(xwidth * props.height / xheight)
                    setRheight(props.height)
                }
            }, Function)
        }
    }, [])
    return (
        <Image {...filteredProps} source={{
            uri: filteredProps.source.uri,
        }} style={[filteredProps.style, {
            width: rwidth > 0 ? rwidth : (props.width || SCREEN_WIDTH),
            height: rheight,
        }]} />
    )
}

export default React.memo(index)

const styles = StyleSheet.create({})
