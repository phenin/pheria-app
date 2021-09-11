import React, { useRef, useState, useEffect } from 'react'
import { Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, View, Animated, FlatList, ScrollView } from 'react-native'
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler'
import CameraRoll from '@react-native-community/cameraroll'
import { goBack } from '../../navigations/rootNavigation'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants'
import { alignItems, width } from 'styled-system'
import { useIsFocused } from '@react-navigation/native'


const StoryTaker = ({ route }) => {
  const [text, setText] = useState('')
  const focused = useIsFocused()
  const [page, setPage] = useState(1)
  const [groups, setGroups] = useState([])
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(-1)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    if (focused) {
        CameraRoll.getPhotos({ assetType: 'Photos', first: 1000 })
            .then(result => {
                const photos = result.edges
                const groupList = Array.from(new Set(photos.map(photo => photo.node.group_name)))
                setGroups(groupList)
                if (groupList.length > 0) setSelectedGroupIndex(0)
            })
    }
    return () => {
    }
  }, [focused])

  useEffect(() => {
    if (selectedGroupIndex > -1) {
        CameraRoll.getPhotos({
            assetType: 'Photos',
            first: 9 * page,
            groupName: groups[selectedGroupIndex]
        })
            .then(result => {
                const photos = result.edges
                setPhotos(photos)
            })
    }
  }, [selectedGroupIndex, page])

  const _onLoadmore = () => {
    setPage(page + 1)
  }

  const _onSelectImage = (index) => {
    setSelectedIndex(index)
  }

  const _onDoneText = () => {

  }

  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="height"
          style={styles.textToolWrapper}>
          <View style={styles.textTopOptions}>
              <TouchableOpacity
                  onPress={goBack}
                  style={styles.btnTopOption}>
                  <Text style={{
                      fontSize: 30,
                      color: '#fff',
                      marginLeft: 10
                  }}>✕</Text>
              </TouchableOpacity>
              <Text style={{
                  ...styles.btnTopOption,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
              }}> Tiêu đề bài viết</Text>
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
                  }}>Tiếp</Text>
              </TouchableOpacity>
          </View>
          <View style={{
              ...styles.textWrapper,
              justifyContent: 'center',
              alignContent: 'center'
          }}>
              <TouchableOpacity style={{
                  backgroundColor: 'rgba(0,0,0,0)',
                  padding: 5,
                  borderRadius: 5
              }}>
                  <TextInput
                      multiline={true}
                      autoFocus={true}
                      autoCapitalize="none"
                      value={text}
                      onChangeText={setText}
                      style={{
                          textAlign: 'center',
                          alignContent: 'center',
                          fontSize: 25,
                          fontWeight: '800',
                          color: '#fff',
                      }}
                  />
              </TouchableOpacity>
          </View>

      </KeyboardAvoidingView>
      
      <View style={styles.avatarStory}>
          {selectedIndex > -1 &&
            <Image
                style={{
                    width: 100,
                    height: 100
                }} source={{ uri: photos[selectedIndex].node.image.uri || '' }} />
          }
      </View>
      
      <FlatList
          onEndReached={_onLoadmore}
          ListHeaderComponent={() => 
            <View style={styles.headerGallerry}>
              <Text style={{
                fontSize: 18,
                fontWeight: '500'
              }}>Ảnh đại diện</Text>
            </View>
          }
          style={styles.galleryList}
          data={photos}
          renderItem={({ item, index }) =>
              <TouchableOpacity
                  onPress={_onSelectImage.bind(null, index)}
                  activeOpacity={0.8}
                  style={{
                      ...styles.imageWrapper,
                      marginHorizontal: (index - 1) % 3 === 0 ? 2.5 : 0
                  }}
              >
                  <Image
                      source={{
                          uri: item.node.image.uri
                      }}
                      style={{
                          width: "100%",
                          height: '100%'
                      }}
                  />
              </TouchableOpacity>
          }
          numColumns={3}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => `${index}`}
      />
      </View>
    </>
  )
}

export default StoryTaker

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(250,250,250)',
    width: '100%',
    height: '100%'
  },
  textToolWrapper: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH,
    backgroundColor: '#000',
    justifyContent: "space-between"
  },
  textTopOptions: {
    flexDirection: 'row',
    height: 50 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textWrapper: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerGallerry: {
    height: 25,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarStory: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: 15,
    height: SCREEN_WIDTH / 3,
  },
  galleryList: {
    marginVertical: 5,
    maxHeight: SCREEN_HEIGHT * 2/3,
  },
  imageWrapper: {
      width: (SCREEN_WIDTH - 5) / 3,
      height: 200,
      marginVertical: 1.25
  },
})