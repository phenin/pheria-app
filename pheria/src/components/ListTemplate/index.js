import React from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Modal } from 'react-native'
import { BlurView } from "@react-native-community/blur"
import { SCREEN_WIDTH } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TextGradient from '../../components/TextGradient'

export const emojiList = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '🤪']

const ListTemplate = ({ modalVisible, _onSelectLabel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
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
  )
}

export default ListTemplate

const styles = StyleSheet.create({
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
})