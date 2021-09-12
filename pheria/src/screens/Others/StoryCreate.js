import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StyleSheet, Keyboard, TouchableOpacity, KeyboardAvoidingView, 
  Animated, Text, TextInput, ImageBackground, Image, Modal } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State, RotationGestureHandler } from 'react-native-gesture-handler'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants'
import { goBack } from '../../navigations/rootNavigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BlurView } from "@react-native-community/blur"
import TextGradient from '../../components/TextGradient'
const textColors = [
  '#000', '#fff', '#318bfb', '#6cc070', '#ffcc00',
  '#f37121', '#c70039', '#512b58', '#ff926b', '#fff3cd', '#ffe277'
  , '#4d3e3e', '#3f3f44'
]
export const emojiList = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '🤪']

const StoryCreate = ({ route }) => {

  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentIndex] = useState(0)
  const [mode, setMode] = useState(1)
  const [draggingLabel, setDraggingLabel] = useState(false)
  const [showLabelOptions, setShowLabelOptions] = useState(false)
  const [text, setText] = useState('')
  const [enableGesture, setEnableGesture] = useState(true)
  const [state, setState] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [textColor, setTextColor] = useState('#fff')
  const [textAlign, setTextAlign] = useState('center')
  const [textBg, setTextBg] = useState(false)

  const _hScrollRef = useRef(null)

  const _scaleAnimList = [...images].map(img => React.useMemo(() => new Animated.Value(SCREEN_WIDTH / img.width), []))
  const _rotateAnimList = [...images].map(img => React.useMemo(() => new Animated.Value(0), []))
  const _translateXAnimList = [...images].map(img => React.useMemo(() => new Animated.Value(0), []))
  const _translateYAnimList = [...images].map(img => React.useMemo(() => new Animated.Value(0), []))
  const _labeLWrapperYAnim = React.useMemo(() => new Animated.Value(0), [])
  const _animRatioTrashCan = React.useMemo(() => new Animated.Value(1), [])

  const _rotationRefList = [...images].map(img => useRef(null))
  const _pinchRefList = [...images].map(img => useRef(null))

  const ref = useRef({
    processImages:  [{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      ratio: SCREEN_WIDTH,
      translateX: 0,
      translateY: 0,
      rotateDeg: 0,
      texts: [],
      labels: []
    }],
    textWidth: 0,
    textHeight: 0,
    trashCanX: (SCREEN_WIDTH - 44) / 2,
    trashCanY: (SCREEN_HEIGHT - 62),
    zoomTrashCan: false,
    labelContainerY: 0
  })

  useEffect(() => {
    _hScrollRef.current?.scrollTo({
        x: SCREEN_WIDTH * currentImageIndex,
        y: 0,
        animated: true
    })
  }, [currentImageIndex])

  const _onLabelOptionsContainerTranslateChangeState = ({ nativeEvent: { translationY, state } }) => {
    if (state === State.END) {
      if (ref.current.labelContainerY + translationY < -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50) / 2) {
          Animated.timing(_labeLWrapperYAnim, {
              duration: 250,
              toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
              useNativeDriver: true
          }).start()
          ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50)
      } else {
          Animated.timing(_labeLWrapperYAnim, {
              duration: 250,
              toValue: 0,
              useNativeDriver: true
          }).start(() => setShowLabelOptions(false))
          ref.current.labelContainerY = 0
          Keyboard.dismiss()
      }
    }
  }

  const _onLabelOptionsContainerTranslate = ({ nativeEvent: { translationY } }) => {
    console.log(translationY)
    if (mode !== 1) return;
    ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - translationY)
    if (ref.current.labelContainerY + translationY < -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50) || ref.current.labelContainerY + translationY > 0) {
      console.log('bbbbbb')
    };
    // if (!showLabelOptions) setShowLabelOptions(true)
    _labeLWrapperYAnim.setValue(ref.current.labelContainerY + translationY)
  }

  const _onEndDrag = ({ nativeEvent: {contentOffset: { x }} }) => {
    const tabIndex = Math.floor(x / SCREEN_WIDTH)
    const percentOffset = (x - tabIndex * SCREEN_WIDTH) / SCREEN_WIDTH
    let nextTabIndex = 0
    if (percentOffset > 0.5) {
        nextTabIndex = tabIndex + 1
    } else {
        nextTabIndex = tabIndex
    }
    _hScrollRef.current?.scrollTo({
        x: nextTabIndex * SCREEN_WIDTH,
        y: 0,
        animated: true
    })
    setCurrentIndex(nextTabIndex)
  }

  const _onText = () => {
    setMode(2)
    refreshTextState()
  }

  const _showLabelOptionsContainer = () => {
    setModalVisible(true)
    // setShowLabelOptions(true)
    // Animated.timing(_labeLWrapperYAnim, {
    //     duration: 250,
    //     toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
    //     useNativeDriver: true
    // }).start()
    // ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50)
  }

  const refreshTextState = () => {
    setText('')
    setTextAlign('center')
    setTextBg(false)
    setTextColor('#fff')
  }

  const _onSelectedEmoji = (emoji) => {
    const textZindexList = ref.current.processImages[currentImageIndex].texts.map(x => x.zIndex)
    const labelZindexList = ref.current.processImages[currentImageIndex].labels.map(x => x.zIndex)
    let maxlabelZindex = Math.max(...textZindexList.concat(labelZindexList)) || 0
    maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0
    const addressLabel = {
        zIndex: maxlabelZindex + 1,
        animRatio: new Animated.Value(1),
        animX: new Animated.Value((SCREEN_WIDTH - 55) / 2),
        animY: new Animated.Value((SCREEN_HEIGHT - 55) / 2),
        x: (SCREEN_WIDTH - 55) / 2,
        y: (SCREEN_HEIGHT - 55) / 2,
        fontSize: 40,
        height: 55,
        width: 55,
        ratio: 1,
        text: emoji,
        type: 'emoji'
    }
    ref.current.processImages[currentImageIndex].labels.push(addressLabel)
    setState({})
  }

  const _onChangeTextAlign = () => {
    if (textAlign === 'center') setTextAlign('flex-start')
    else if (textAlign === 'flex-start') setTextAlign('flex-end')
    else if (textAlign === 'flex-end') setTextAlign('center')
  }

  const _onDoneText = () => {
    if (text.length > 0) {
        const offsetX = textAlign === 'center' ? (SCREEN_WIDTH - ref.current.textWidth) / 2 : (
            textAlign === 'flex-start' ? 15 : SCREEN_WIDTH - ref.current.textWidth - 15
        )
        const textZindexList = ref.current.processImages[currentImageIndex].texts.map(x => x.zIndex)
        const labelZindexList = ref.current.processImages[currentImageIndex].labels.map(x => x.zIndex)
        let maxlabelZindex = Math.max(...textZindexList.concat(labelZindexList))
        maxlabelZindex = maxlabelZindex !== -Infinity ? maxlabelZindex : 0
        const storyText = {
            zIndex: maxlabelZindex + 1,
            color: textColor,
            fontSize: 40,
            text,
            textAlign,
            textBg,
            x: offsetX,
            y: (SCREEN_HEIGHT - ref.current.textHeight) / 2,
            animX: new Animated.Value(offsetX),
            animY: new Animated.Value((SCREEN_HEIGHT - ref.current.textHeight) / 2),
            height: ref.current.textHeight,
            width: ref.current.textWidth,
            ratio: 1,
            animRatio: new Animated.Value(1)
        }
        ref.current.processImages[currentImageIndex].texts.push(storyText)
    }
    setMode(1)
  }

  const _onSelectLabel = (type, value) => {
    switch (type) {
      case 'address':
          // navigate('LocationChooser', {
          //     onDone: _onSelectedAddressLabel
          // })
          // break
      case 'people':
          refreshTextState()
          setMode(3)
          break
      case 'hashtag':
          refreshTextState()
          setMode(4)
          break
      case 'emoji':
          _onSelectedEmoji(value )
          break
      default:
          throw new Error()
    }
    setModalVisible(false)
  }
  const _onTextLabelTranslateHandler = (index,
    { nativeEvent: {
        translationX, translationY
    } }
  ) => {

    if (!draggingLabel) setDraggingLabel(true)
    const label = ref.current.processImages[currentImageIndex].texts[index]

    if (Math.abs((label.y + translationY + label.height) * label.ratio - ref.current.trashCanY) < 50) {
        if (!ref.current.zoomTrashCan) {
            Animated.spring(_animRatioTrashCan, {
                toValue: 1.5,
                useNativeDriver: true
            }).start(() => ref.current.zoomTrashCan = true)
        }
    } else {
        if (ref.current.zoomTrashCan) {
            Animated.spring(_animRatioTrashCan, {
                toValue: 1,
                useNativeDriver: true
            }).start(() => ref.current.zoomTrashCan = false)
        }
    }
    label.animX.setValue((label.x + translationX) * label.ratio)
    label.animY.setValue((label.y + translationY) * label.ratio)
  }
  const _onTextLabelTranslateChangeState = (index,
    { nativeEvent: {
        translationX, translationY, state
    } }
  ) => {
    setDraggingLabel(false)
    if (state === State.END) {
        const label = ref.current.processImages[currentImageIndex].texts[index]
        label.x += translationX
        label.y += translationY
        if (Math.abs((label.y + label.height) * label.ratio
            - ref.current.trashCanY) < 50
        ) {
            ref.current.processImages[currentImageIndex].texts.splice(index, 1)
            setState({})
        }
        ref.current.zoomTrashCan = false
    }
  }
  const _onTextLabelZoomHandler = (index,
    { nativeEvent: {
        scale
    } }
  ) => {
    const label = ref.current.processImages[currentImageIndex].texts[index]
    label.animRatio.setValue(label.ratio * scale)
  }
  const _onTextLabelZoomChangeState = (index,
    { nativeEvent: {
        scale, state
    } }
  ) => {
    if (state === State.END) {
        const label = ref.current.processImages[currentImageIndex].texts[index]
        label.ratio *= scale
    }
  }
  const _onLabelTranslateHandler = (index,
    { nativeEvent: {
        translationX, translationY
    } }
) => {

    if (!draggingLabel) setDraggingLabel(true)
    const label = ref.current.processImages[currentImageIndex].labels[index]

    if (Math.abs((label.y + translationY + label.height) * label.ratio - ref.current.trashCanY) < 50) {
        if (!ref.current.zoomTrashCan) {
            Animated.spring(_animRatioTrashCan, {
                toValue: 1.5,
                useNativeDriver: true
            }).start(() => ref.current.zoomTrashCan = true)
        }
    } else {
        if (ref.current.zoomTrashCan) {
            Animated.spring(_animRatioTrashCan, {
                toValue: 1,
                useNativeDriver: true
            }).start(() => ref.current.zoomTrashCan = false)
        }
    }
    label.animX.setValue((label.x + translationX) * label.ratio)
    label.animY.setValue((label.y + translationY) * label.ratio)
}
const _onLabelTranslateChangeState = (index,
    { nativeEvent: {
        translationX, translationY, state
    } }
) => {
    setDraggingLabel(false)
    if (state === State.END) {
        const label = ref.current.processImages[currentImageIndex].labels[index]
        label.x += translationX
        label.y += translationY
        if (Math.abs((label.y + label.height) * label.ratio
            - ref.current.trashCanY) < 50
        ) {
            ref.current.processImages[currentImageIndex].labels.splice(index, 1)
            setState({})
        }
        ref.current.zoomTrashCan = false
    }
  }
  //Label zoom processor
  const _onLabelZoomHandler = (index,
    { nativeEvent: {
        scale
    } }
  ) => {
    const label = ref.current.processImages[currentImageIndex].labels[index]
    label.animRatio.setValue(label.ratio * scale)
  }
  const _onLabelZoomChangeState = (index,
    { nativeEvent: {
        scale, state
    } }
  ) => {
    if (state === State.END) {
        const label = ref.current.processImages[currentImageIndex].labels[index]
        label.ratio *= scale
    }
  }
  const _onTranslateHandler = ({ nativeEvent: {
    translationX,
    translationY,
  } }) => {
    _translateXAnimList[currentImageIndex].setValue(
        ref.current.processImages[currentImageIndex].translateX + translationX
    )
    _translateYAnimList[currentImageIndex].setValue(
        ref.current.processImages[currentImageIndex].translateY + translationY
    )
  }
  const _onTranslateStateChange = ({ nativeEvent: {
    translationX,
    translationY,
    state,
  } }) => {
    if (state === State.END) {
        ref.current.processImages[currentImageIndex].translateX += translationX
        ref.current.processImages[currentImageIndex].translateY += translationY
    }
  }
  const _onZoomHandler = ({ nativeEvent: {
    scale
  } }) => {
    _scaleAnimList[currentImageIndex].setValue(
        ref.current.processImages[currentImageIndex].ratio * scale)
  }
  const _onZoomStateChange = ({ nativeEvent: {
    scale, state
  } }) => {
    if (state === State.END) {
        ref.current.processImages[currentImageIndex].ratio *= scale

    }
  }
  const _onRotateHandler = ({ nativeEvent: {
    rotation
  } }) => {
    _rotateAnimList[currentImageIndex].setValue(
        ref.current.processImages[currentImageIndex].rotateDeg + rotation)
  }
  const _onRotateStateChange = ({ nativeEvent: {
      rotation, state
  } }) => {
      if (state === State.END) {
          ref.current.processImages[currentImageIndex].rotateDeg += rotation
      }
  }

  return (
    <PanGestureHandler
      onHandlerStateChange={_onLabelOptionsContainerTranslateChangeState}
      onGestureEvent={_onLabelOptionsContainerTranslate}>
        <View>
          {mode === 1 && !draggingLabel && !showLabelOptions &&
            <View style={styles.topOptionsWrapper}>
                <TouchableOpacity
                    onPress={goBack}
                    style={styles.btnTopOption}>
                    <Text style={{
                        fontSize: 30,
                        color: '#fff',
                    }}>✕</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={_showLabelOptionsContainer}
                    style={styles.btnTopOption}>
                    <Icon name="sticker-emoji" size={30} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={_onText}
                    style={styles.btnTopOption}>
                    <Icon name="alpha-a-box" size={30} color='#fff' />
                </TouchableOpacity>
            </View>
          }
          {mode === 2 &&
              <KeyboardAvoidingView
                  behavior="height"
                  style={styles.textToolWrapper}>
                  <View style={styles.textTopOptions}>
                      <TouchableOpacity
                          onPress={_onChangeTextAlign}
                          style={styles.btnTopOption}>
                          <Icon name={textAlign === 'center' ? 'format-align-center' : (
                              textAlign === 'flex-start' ? 'format-align-left' : 'format-align-right'
                          )} size={30} color='#fff' />
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={setTextBg.bind(null, !textBg)}
                          style={styles.btnTopOption}>
                          <Icon name={textBg ? 'alpha-a-box' : "alpha-a"} size={30} color='#fff' />
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={_onDoneText}
                          style={{
                              ...styles.btnTopOption,
                              width: 60
                          }}>
                          <Text style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 18
                          }}>Done</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{
                      ...styles.textWrapper,
                      justifyContent: textAlign
                  }}>
                      <TouchableOpacity style={{
                          backgroundColor: textBg === true ? textColor :
                              'rgba(0,0,0,0)',
                          padding: 5,
                          borderRadius: 5
                      }}>
                          <TextInput
                              onContentSizeChange={e => {
                                  ref.current.textHeight = e.nativeEvent.contentSize.height
                                  ref.current.textWidth = e.nativeEvent.contentSize.width
                              }}
                              multiline={true}
                              autoFocus={true}
                              autoCapitalize="none"
                              value={text}
                              onChangeText={setText}
                              style={{
                                  textAlign: textAlign === 'flex-start' ? 'left' : (
                                      textAlign === 'flex-end' ? 'right' : 'center'
                                  ),
                                  fontSize: 40,
                                  fontWeight: '800',
                                  color: textBg ? '#000' : textColor,
                                  maxWidth: SCREEN_WIDTH - 30,
                              }}
                          />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.textBottompOptions}>
                      <View style={{
                          ...styles.circleSelectedColor,
                          backgroundColor: textColor
                      }}>
                          <Icon name="eyedropper-variant" size={20} color={
                              textColor === '#fff' ? '#000' : '#fff'
                          } />
                      </View>
                      <ScrollView
                          showsHorizontalScrollIndicator={false}
                          style={{
                              width: SCREEN_WIDTH - 50
                          }}
                          keyboardShouldPersistTaps="always"
                          horizontal={true}>
                          {textColors.map((tColor, index) => (
                              <TouchableOpacity
                                  key={index}
                                  onPress={() => setTextColor(tColor)}
                                  style={{
                                      ...styles.circleTextColor,
                                      backgroundColor: tColor
                                  }}>

                              </TouchableOpacity>
                          ))}
                      </ScrollView>
                  </View>
              </KeyboardAvoidingView>
          }
          <ScrollView
            onScrollEndDrag={_onEndDrag}
            showsHorizontalScrollIndicator={false}
            ref={_hScrollRef}
            bounces={false}
            horizontal={true}
            style={styles.scrollView}>
              {ref.current.processImages.map((photo, index) => (
                        <ImageBackground
                            key={index}
                            style={styles.backgroundContainer}
                            source={require('../../assets/backgrounds/Black.png')}
                            blurRadius={10}
                        >
                             {photo.texts.map((txtLabel, labelIndex) => (
                                <PanGestureHandler
                                    key={labelIndex}
                                    onGestureEvent={e => {
                                        _onTextLabelTranslateHandler(labelIndex, e)
                                    }}
                                    onHandlerStateChange={e => {
                                        _onTextLabelTranslateChangeState(labelIndex, e)
                                    }}
                                >
                                    <PinchGestureHandler
                                        onGestureEvent={e => {
                                            _onTextLabelZoomHandler(labelIndex, e)
                                        }}
                                        onHandlerStateChange={e => {
                                            _onTextLabelZoomChangeState(labelIndex, e)
                                        }}
                                    >
                                        <Animated.View style={{
                                            zIndex: txtLabel.zIndex,
                                            backgroundColor: txtLabel.textBg ? txtLabel.color : 'rgba(0,0,0,0)',
                                            padding: 5,
                                            borderRadius: 5,
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            transform: [{
                                                translateX: txtLabel.animX,
                                            },
                                            {
                                                translateY: txtLabel.animY
                                            },
                                            {
                                                scale: txtLabel.animRatio
                                            }
                                            ]
                                        }}>
                                            <Text
                                                style={{
                                                    width: txtLabel.width,
                                                    height: txtLabel.height + 5,
                                                    textAlign: txtLabel.textAlign === 'flex-start' ? 'left' : (
                                                        txtLabel.textAlign === 'flex-end' ? 'right' : 'center'
                                                    ),
                                                    fontSize: 40,
                                                    fontWeight: '800',
                                                    color: txtLabel.textBg ? '#000' : txtLabel.color,

                                                }}
                                            >
                                                {txtLabel.text}
                                            </Text>
                                        </Animated.View>
                                    </PinchGestureHandler>
                                </PanGestureHandler>
                            ))}
                            {photo.labels.map((label, labelIndex) => (
                                <PanGestureHandler
                                    key={labelIndex}
                                    onGestureEvent={e => {
                                        _onLabelTranslateHandler(labelIndex, e)
                                    }}
                                    onHandlerStateChange={e => {
                                        _onLabelTranslateChangeState(labelIndex, e)
                                    }}
                                >

                                    <PinchGestureHandler
                                        onGestureEvent={e => {
                                            _onLabelZoomHandler(labelIndex, e)
                                        }}
                                        onHandlerStateChange={e => {
                                            _onLabelZoomChangeState(labelIndex, e)
                                        }}
                                    >
                                        <Animated.View style={{
                                            zIndex: label.zIndex,
                                            backgroundColor: label.type === 'emoji' ? 'rgba(0,0,0,0)' : '#fff',
                                            borderRadius: 5,
                                            position: 'absolute',
                                            width: label.width,
                                            height: label.height,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            top: 0,
                                            left: 0,
                                            transform: [
                                                {
                                                    translateX: label.animX,
                                                },
                                                {
                                                    translateY: label.animY
                                                },
                                                {
                                                    scale: label.animRatio
                                                }
                                            ]
                                        }}>
                                            {label.type === 'emoji' ? (
                                                <Text style={{
                                                    fontSize: label.fontSize,
                                                }}>
                                                    {label.text}
                                                </Text>
                                            ) : (
                                                    <TextGradient
                                                        {...(label.type === 'address' ? {
                                                            icon: {
                                                                name: 'map-marker',
                                                                size: label.fontSize
                                                            }
                                                        } : {})}
                                                        text={label.text}
                                                        numberOfLines={1}
                                                        style={{
                                                            fontSize: label.fontSize,
                                                            maxWidth: label.width
                                                                - (label.type === 'address' ? label.fontSize : 0)
                                                        }}
                                                    />
                                                )}
                                        </Animated.View>
                                    </PinchGestureHandler>
                                </PanGestureHandler>
                            ))} 
                            <PanGestureHandler
                                enabled={enableGesture}
                                minPointers={2}
                                onHandlerStateChange={_onTranslateStateChange}
                                onGestureEvent={_onTranslateHandler}
                            >
                                <RotationGestureHandler
                                    enabled={enableGesture}
                                    onHandlerStateChange={_onRotateStateChange}
                                    ref={_rotationRefList[index]}
                                    simultaneousHandlers={_pinchRefList[index]}
                                    onGestureEvent={_onRotateHandler}>
                                    <PinchGestureHandler
                                        enabled={enableGesture}
                                        onHandlerStateChange={_onZoomStateChange}
                                        ref={_pinchRefList[index]}
                                        simultaneousHandlers={_rotationRefList[index]}
                                        onGestureEvent={_onZoomHandler}>
                                            <Image
                                                resizeMode="contain"
                                                style={{
                                                    width: '100%',
                                                    height: "100%"
                                                }}
                                                source={{
                                                  uri: photo.uri
                                                }} />
                                    </PinchGestureHandler>
                                </RotationGestureHandler>
                            </PanGestureHandler>
                        </ImageBackground>
                    ))}
          </ScrollView>
          {draggingLabel &&
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 80,
                backgroundColor: 'rgba(0,0,0,0.3)'
            }}>
                <Animated.View
                    style={{
                        height: 44,
                        width: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 44,
                        borderColor: '#fff',
                        borderWidth: 1,
                        transform: [{
                            scale: _animRatioTrashCan
                        }]
                    }}>
                    <Icon name="trash-can-outline" size={30}
                        color="#fff" />
                </Animated.View>
            </View>
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <BlurView
                style={{
                    width: "100%",
                    height: '100%',
                }}
                blurType="dark"
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
            >
                  <View style={styles.labelOptionsTitleWrapper}>
                      <View style={styles.dragBar} />
                      <View style={styles.labelOptionsSearchWrapper}>
                          <View style={styles.searchIcon}>
                              <Icon name="magnify" size={24} color="#fff" />
                          </View>
                          <TextInput
                              style={styles.labelOptionsSearch}
                              placeholder="Search"
                              placeholderTextColor="#fff"
                          />
                      </View>
                  </View>
                  <ScrollView
                      contentContainerStyle={{
                          flexDirection: 'row',
                          flexWrap: 'wrap'
                      }}
                      bounces={false}
                      showsVerticalScrollIndicator={true}
                  >
                      <TouchableOpacity
                          onPress={() => _onSelectLabel('address')}
                          style={styles.labelItemWrapper}>
                          <View style={styles.mainLabel}>
                              <TextGradient
                                  icon={{
                                      name: 'map-marker',
                                      size: 16
                                  }}
                                  text="LOCATION" style={{
                                      fontSize: 16
                                  }} />
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => _onSelectLabel('people')}
                          style={styles.labelItemWrapper}>
                          <View style={styles.mainLabel}>
                              <TextGradient text="@MENTION" style={{
                                  fontSize: 16
                              }} />
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => _onSelectLabel('hashtag')}
                          style={styles.labelItemWrapper}>
                          <View style={styles.mainLabel}>
                              <TextGradient text="#HASHTAG" style={{
                                  fontSize: 16
                              }} />
                          </View>
                      </TouchableOpacity>
                      {emojiList.map((emoji, index) => (
                          <TouchableOpacity
                              key={index}
                              onPress={() => _onSelectLabel('emoji', emoji)}
                              style={styles.labelItemWrapper}>
                              <Text style={{
                                  fontSize: 40
                              }}>{emoji}</Text>
                          </TouchableOpacity>
                      ))}

                  </ScrollView>
              </BlurView>
          </Modal>
        </View>
    </PanGestureHandler>
  )
}

export default StoryCreate

const styles = StyleSheet.create({
  scrollView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backgroundContainer: {
    overflow: 'hidden',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: 'center'
  },
  topOptionsWrapper: {
    height: 50 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1,
    width: '100%'
  },
  btnTopOption: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelOptionsTitleWrapper: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dragBar: {
    marginTop: 15,
    width: 50,
    height: 3,
    borderRadius: 1,
    backgroundColor: '#fff'
  },
  labelOptionsSearchWrapper: {
    height: 44,
    flexDirection: 'row',
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  labelOptionsSearch: {
    fontSize: 16,
    color: '#fff',
    width: SCREEN_WIDTH - 30 - 44,
  },
  searchIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelItemWrapper: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainLabel: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 36,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textToolWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: "space-between"
  },
  textTopOptions: {
    flexDirection: 'row',
    height: 50 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textBottompOptions: {
    minHeight: 36,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  circleSelectedColor: {
      width: 36,
      marginHorizontal: 5,
      height: 36,
      borderRadius: 36,
      justifyContent: 'center',
      alignItems: 'center'
  },
  circleTextColor: {
      height: 24,
      width: 24,
      borderRadius: 24,
      borderColor: '#fff',
      borderWidth: 2,
      marginHorizontal: 5
  },
})