import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Animated, Text, TextInput } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants'
import { goBack } from '../../navigations/rootNavigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BlurView } from "@react-native-community/blur"
import TextGradient from '../../components/TextGradient'

export const emojiList = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '🤪']

const StoryCreate = ({ route }) => {

  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentIndex] = useState(0)
  const [mode, setMode] = useState(1)
  const [draggingLabel, setDraggingLabel] = useState(false)
  const [showLabelOptions, setShowLabelOptions] = useState(false)
  const [text, setText] = useState('')
  
  const _hScrollRef = useRef(null)

  const _labeLWrapperYAnim = React.useMemo(() => new Animated.Value(0), [])
  const _animRatioTrashCan = React.useMemo(() => new Animated.Value(1), [])

  const ref = useRef({
    processImages: [...images].map(img => {
        return {
            base64: img.base64,
            extension: img.extension,
            uri: img.uri,
            width: img.width,
            height: img.height,
            ratio: SCREEN_WIDTH / img.width,
            translateX: 0,
            translateY: 0,
            rotateDeg: 0,
            texts: [],
            labels: []
        }
    }),
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
    
  }

  const _onLabelOptionsContainerTranslate = ({ nativeEvent: { translationY } }) => {

  }

  const _onEndDrag = ({ nativeEvent: {contentOffset: { x }} }) => {
    
  }

  const _onText = () => {
    setMode(2)
    refreshTextState()
  }

  const _showLabelOptionsContainer = () => {
    setShowLabelOptions(true)
    Animated.timing(_labeLWrapperYAnim, {
        duration: 250,
        toValue: -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50),
        useNativeDriver: true
    }).start()
    ref.current.labelContainerY = -(SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50)
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
    _hideLabelOptionsContainer()
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
          <ScrollView
            onScrollEndDrag={_onEndDrag}
            showsHorizontalScrollIndicator={false}
            ref={_hScrollRef}
            bounces={false}
            horizontal={true}
            style={styles.scrollView}>
              
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
          <Animated.View style={{
              ...styles.labelOptionsWrapper,
              transform: [{
                  translateY: _labeLWrapperYAnim
              }]
          }}>
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
          </Animated.View>
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
  }
})