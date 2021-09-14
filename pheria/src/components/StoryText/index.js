import React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'

const textColors = [
  '#000', '#fff', '#318bfb', '#6cc070', '#ffcc00',
  '#f37121', '#c70039', '#512b58', '#ff926b', '#fff3cd', '#ffe277'
  , '#4d3e3e', '#3f3f44'
]

const StoryText = ({
  text, textAlign, textBg, textColor, _onChangeTextAlign, 
  _onDoneText, setTextColor, setTextBg, setText,
  _onContentSizeChange
}) => {
  return (
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
                        onContentSizeChange={e => _onContentSizeChange(e)}
                        multiline={true}
                        autoFocus={true}
                        autoCapitalize="none"
                        value={text}
                        onChangeText={setText}
                        style={{
                            textAlign: textAlign === 'flex-start' ? 'left' : (
                                textAlign === 'flex-end' ? 'right' : 'center'
                            ),
                            fontSize: 20,
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
  )
}
export default StoryText

const styles = StyleSheet.create({
  textToolWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 50,
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