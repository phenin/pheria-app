import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { UpdateUserInfoRequest } from '../../../actions/userActions'
import { checkExistUsername }  from '../../../api/user'
import MaterialInput from '../../../components/MaterialInput'
import NavigationBar from '../../../components/NavigationBar'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT, DEFAULT_PHOTO_URI } from '../../../constants'
import { goBack, navigate } from '../../../navigations/rootNavigation'
import { store } from '../../../store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { string } from 'yup'
import { useSelector } from '../../../reducers'
const EditProfile = () => {
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user.user.userInfo)
    const [name, setName] = useState(user?.name || '')
    const [description, setDescription] = useState(user?.description || '')
    const [email, setEmail] = useState(user?.email || '')
    const [showModal, setShowModal] = useState(false)
    const _topOffsetMainContent = React.useMemo(() => new Animated.Value(1), [])
    const [updating, setUpdating] = useState(false)
    const _loadingDeg = React.useMemo(() => new Animated.Value(0), [])
    const [usernameError, setUsernameError] = useState('')
    const ref = useRef({
        timeout: setTimeout(() => { }, 0)
    })
    /**
     * 1: general information
     * 2: email
     */
    const [inputFor, setInputFor] = useState(1)

    useEffect(() => {
        return () => {
            _loadingDeg.stopAnimation()
            setUpdating(false)
        }
    }, [])
    useEffect(() => {
        clearTimeout(ref.current.timeout)
        ref.current.timeout = setTimeout( async () => {
            try{
                const result = await checkExistUsername(name)
                if(result.data.status === 200){
                    setUsernameError('')
                }
                else{
                    setUsernameError('T??n ???? t???n t???i')
                }
            }
            catch(e) {
                setUsernameError('T??n ???? t???n t???i')
            }

        }, 300);
    }, [name])
    const _onAnimateMainContent = () => {
        Animated.timing(_topOffsetMainContent, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start()
    }
    const _confirmGoBack = () => {
        if (inputFor !== 1) {
            setInputFor(1)
            setEmail(user?.email || '')
        } else {
            goBack()
        }
    }
    const _onDone = async () => {
        setUpdating(true)
        switch (inputFor) {
            case 1:
                await dispatch(UpdateUserInfoRequest({
                    name,
                    description,
                }))
                goBack()
                break;
            case 2:
                if (email === user?.email) {
                    setInputFor(1)
                } else {
                    const emailValidation = string().email()
                    emailValidation.validate(email).then(validatedEmail => {
                        // firestore().collection('users').where('email', '==', validatedEmail)
                        //     .get().then(rs => {
                        //         if (rs.size > 0) {
                        //             Alert.alert('Email is used', 'Another people used this email!')
                        //         } else {
                        //             dispatch(UpdateUserInfoRequest({
                        //                 email: validatedEmail
                        //             }))
                        //             setInputFor(1)
                        //         }
                        //     })
                    }).catch(err => {
                        Alert.alert('Email is not valid!', 'You need input a vaild email')
                    })
                }
                break;
            
        }
        setUpdating(false)
    }
    const _animateLoading = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            useNativeDriver: true,
            duration: 300
        }).start(() => {
            if (updating) {
                _loadingDeg.setValue(0)
                _animateLoading()
            }
        })
    }
    const _removeProfilePhoto = async () => {
        await dispatch(UpdateUserInfoRequest({
            avatarURL: DEFAULT_PHOTO_URI
        }))
        goBack()
    }
    return (
        <SafeAreaView>
            <View style={styles.customNavigationBar}>
                <NavigationBar title={inputFor === 1 ? "Ch???nh s???a th??ng tin" : '?????i ?????a ch??? email' } callback={_confirmGoBack} />
                <TouchableOpacity
                    disabled={updating}
                    onPress={_onDone}
                    style={styles.btnSave}>
                    {!updating ? <Image style={{
                        width: 20,
                        height: 20
                    }} source={require("../../../assets/icons/correct.png")} /> :
                        <Animated.Image
                            onLayout={_animateLoading}
                            style={{
                                width: 20,
                                height: 20,
                                transform: [{
                                    rotate: _loadingDeg.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }]
                            }} source={require("../../../assets/icons/waiting.png")} />
                    }

                </TouchableOpacity>
            </View>

            {showModal && <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowModal(false)}
                style={styles.modalWraper}>
                <View style={{
                    backgroundColor: '#fff',
                    width: '90%'
                }}>
                    <View style={{ backgroundColor: "#000" }}>
                        <View style={{
                            ...styles.changePhotoOptionItem,
                            borderBottomColor: '#ddd',
                            borderBottomWidth: 1
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600'
                            }}>?????i ???nh ?????i di??n</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigate('GalleryChooser', { isChooseProfilePhoto: true })}
                            activeOpacity={0.9}
                            style={styles.changePhotoOptionItem}>
                            <Text style={{
                                fontSize: 16,
                            }}>???nh ?????i di???n m???i</Text>
                        </TouchableOpacity>

                        {user?.avatarURL !== DEFAULT_PHOTO_URI &&
                            <TouchableOpacity
                                onPress={_removeProfilePhoto}
                                activeOpacity={0.9}
                                style={styles.changePhotoOptionItem}>
                                <Text style={{
                                    fontSize: 16,
                                }}>Xo?? ???nh ?????i di???n</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableOpacity>
            }<KeyboardAvoidingView
                behavior="padding"
                style={{
                    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44,
                }}>
                {inputFor === 1 && <Animated.ScrollView
                    style={{
                        ...styles.mainContent,
                        height: '100%',
                        transform: [{
                            translateY: _topOffsetMainContent.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44]
                            })
                        }]
                    }}
                    onLayout={_onAnimateMainContent}>
                    <View style={styles.wrapper}>
                        <View style={styles.chooseAvatar}>
                            <Image style={{
                                width: 92,
                                height: 92,
                                borderRadius: 92
                            }} source={{
                                uri: user?.picture
                            }} />
                            <TouchableOpacity
                                onPress={() => setShowModal(true)}
                                activeOpacity={0.8}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    marginVertical: 10,
                                    color: '#318bfb'
                                }}>?????i ???nh ?????i di???n</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <MaterialInput
                                containerStyle={{
                                    marginVertical: 10
                                }}
                                name="T??n t??i kho???n"
                                errorMsg={usernameError.length > 0 ? usernameError : undefined}
                                value={name}
                                onChangeText={setName}
                            />
                            
                            <MaterialInput
                                containerStyle={{
                                    marginVertical: 10
                                }}
                                name="M?? t???"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                        <View style={styles.infoFormWrapper}>
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 16
                            }}>Th??ng tin t??i kho???n</Text>
                            <TouchableOpacity
                                onPress={() => setInputFor(2)}
                                activeOpacity={0.8}
                                style={styles.infoItem}>
                                <Text style={{
                                    fontWeight: '600',
                                    color: '#666'
                                }}>
                                    ?????a ch??? email
                                </Text>
                                <View style={{
                                    marginTop: 2,
                                    paddingBottom: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ddd"
                                }}>
                                    <Text>{user?.email}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.ScrollView>
                }
                {inputFor === 2 &&
                    <View style={styles.popupScreen}>
                        <View style={styles.emailInputWrapper}>
                            <View style={{
                                height: '100%',
                                width: 44,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon name="email-outline" size={30} />
                            </View>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                autoCapitalize="none"
                                style={{
                                    width: SCREEN_WIDTH - 30 - 44,
                                    height: '100%'
                                }} />
                        </View>
                    </View>}
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default EditProfile

const styles = StyleSheet.create({
    modalWraper: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    changePhotoOptionItem: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        height: 44,
        justifyContent: 'center'
    },
    customNavigationBar: {
        position: 'relative'
    },
    btnSave: {
        position: 'absolute',
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        top: 0,
    },
    mainContent: {
        zIndex: 1,
        backgroundColor: '#fff',
        width: "100%",
    },
    wrapper: {
        padding: 15,
    },
    chooseAvatar: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoFormWrapper: {
        marginTop: 30,
    },
    infoItem: {
        marginVertical: 10
    },
    popupScreen: {
        paddingTop: 10,
        height: SCREEN_HEIGHT - 44 - STATUS_BAR_HEIGHT,
        width: '100%',
        backgroundColor: "#fff"
    },
    emailInputWrapper: {
        width: SCREEN_WIDTH - 30,
        marginHorizontal: 15,
        height: 44,
        flexDirection: 'row',
        borderBottomColor: '#318bfb',
        borderBottomWidth: 1
    },
    inputWrapper: {
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1,
        width: SCREEN_WIDTH - 30,
        position: 'relative',
    },
    loadingIcon: {
        width: 36,
        height: 36,
    },
    
})