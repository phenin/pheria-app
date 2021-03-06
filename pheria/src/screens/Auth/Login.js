import React, { useState, useEffect } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { LoginRequest, LoginRequestByGoogle } from '../../actions/userActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants'
import { navigation } from '../../navigations/rootNavigation'

import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';

const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [hidePassword, sethidePassword] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [allowLogin, setallowLogin] = useState(false)
    const _loadingDeg = new Animated.Value(0)

    const _animationLoadingDeg = () => {
        Animated.timing(_loadingDeg, {
            useNativeDriver: true,
            toValue: 1,
            duration: 400
        }).start(() => {
            _loadingDeg.setValue(0)
            if (loading) _animationLoadingDeg()
        })
    }

    useEffect(() => {
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          offlineAccess: true,
          webClientId: '279484816241-tt5n888b74m6kulj3i97bmfo3c0d9n10.apps.googleusercontent.com',
          iosClientId: '279484816241-bdjh239kofibe3cgnlt4cdvlvkoqevdh.apps.googleusercontent.com',
        });
    }, []);

    const _signInByGoogle = async () =>{
        try {
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.idToken)
            dispatch(LoginRequestByGoogle({token: userInfo.idToken}))
            
            
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              alert('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              alert('Signing In');
            } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
              alert('Play Services Not Available or Outdated');
            } else {
              alert(error.message);
            }
        }
    }

    const {
        _onChangeUsername,
        _onChangePassword,
        _onPressToggleHidePassword,
        _onLogin,
        _onPressRegister 
    } = getEventHandlers(
        sethidePassword,
        hidePassword, password, setallowLogin,
        setUsername, username, setPassword, setLoading, dispatch)

    return (
        <SafeAreaView style={styles.container}>
            {loading && <View style={styles.loadingWrapper}>
                <View style={styles.loading}>
                    <Animated.Image onLayout={_animationLoadingDeg} style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        transform: [
                            {
                                rotate: _loadingDeg.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }
                        ]
                    }} source={require('../../assets/icons/waiting.png')} />
                    <Text style={{
                        fontWeight: '500'
                    }}>Logining...</Text>
                </View>
            </View>
            }
            
            <View style={styles.centerContainer}>
                <View style={styles.logoWrapper}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={require('../../assets/images/logo.png')} />
                </View>
                <View style={styles.loginForm}>
                    <View style={styles.textInputWrapper}>
                        <TextInput autoCapitalize="none" value={username} onChangeText={_onChangeUsername} placeholder="T??n ????ng nh???p, ?????a ch??? email"
                            style={styles.input} placeholderTextColor="#fff"  />
                    </View>
                    <View style={styles.textInputWrapper}>
                        <TextInput value={password}
                            onChangeText={_onChangePassword}
                            secureTextEntry={hidePassword}
                            placeholder="M???t kh???u" style={styles.input} placeholderTextColor="#fff" />
                        <TouchableOpacity
                            style={styles.hidePasswordIcon}
                            onPress={_onPressToggleHidePassword}
                        >
                            {hidePassword ? (
                                <Icon name="eye-off-outline" size={20}
                                    color="#333" />
                            ) : (
                                    <Icon name="eye-outline" color="#318bfb"
                                        size={20} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={_onLogin}
                        disabled={!allowLogin}
                        activeOpacity={0.6} style={{
                            ...styles.btnLogin,
                            opacity: allowLogin ? 1 : 0.6
                        }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: '500'
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.otherOptionsWrapper}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}
                        style={styles.forgotPassword}
                        activeOpacity={1}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 12,
                            fontWeight: '600',
                            color: '#fff'
                        }}>
                            <Text style={{
                                fontWeight: '500',
                                color: '#fff'
                            }}>B???n c?? qu??n t??i kho???n c???a m??nh kh??ng? 
                            </Text></Text>
                    </TouchableOpacity>
                    <View style={styles.divideLine}>
                        <View style={styles.ORtextWrapper}>
                            <Text style={{
                                color: '#fff',
                                fontWeight: '600'
                            }}>OR</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnLoginWithGoogle}
                        onPress={() => _signInByGoogle()}>
                        <Icon name="google" color="#1b6563cc" size={20} />
                        <Text style={{
                            color: '#1b6563cc',
                            fontWeight: 'bold'
                        }}>????ng nh???p b???ng Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={_onPressRegister}
                activeOpacity={1}
                style={styles.registerWrapper}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#fff'
                }}>
                    <Text style={{
                        fontWeight: '500',
                        color: '#fff'
                    }}>B???n ch??a c?? t??i kho???n?
                            </Text > ????ng k?? ngay.</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default Login
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: SCREEN_HEIGHT
    },
    btnCurLanguage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    curLanguage: {
        color: '#333'
    },
    centerContainer: {
        height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoWrapper: {
        marginBottom: 20
    },
    logo: {
        height: 64,
        overflow: 'hidden'
    },
    loginForm: {
        width: SCREEN_WIDTH * 0.9,
    },
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    hidePasswordIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        right: 5,
        top: (44 - 30) / 2
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
        color: '#fff'
    },
    btnLogin: {
        marginTop: 7.5,
        width: '100%',
        height: 44,
        borderRadius: 5,
        backgroundColor: '#1b6563cc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherOptionsWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPassword: {
        width: SCREEN_WIDTH * 0.8,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divideLine: {
        marginVertical: 10,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd',
    },
    ORtextWrapper: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH * 0.9 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#000',
    },
    btnLoginWithGoogle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerWrapper: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    loadingWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#000',
        alignItems: 'center'
    },
})
function getEventHandlers(
    sethidePassword,
    hidePassword,
    password,
    setallowLogin,
    setUsername,
    username,
    setPassword,
    setLoading,
    dispatch) {
    const _onPressToggleHidePassword = () => {
        sethidePassword(!hidePassword)
    }
    const _onChangeUsername = (text) => {
        allowLoginCheck(text, password, setallowLogin)
        setUsername(text)
    }
    const _onChangePassword = (text) => {
        allowLoginCheck(username, text, setallowLogin)
        setPassword(text)
    }
    const _onPressRegister = () => {
        navigation.navigate('Register')
    }
    const _onLogin = async () => {
        setLoading(true)
        let email = username
                
        const loginData = {
            email: email,
            password,
        }
        await dispatch(LoginRequest(loginData))
        setLoading(false)
    }
    return {
        _onChangeUsername, _onChangePassword,
        _onPressToggleHidePassword, _onLogin, _onPressRegister
    }
}

function allowLoginCheck(
    username,
    password,
    setallowLogin) {
    if (username.length > 0 && password.length > 0)
        setallowLogin(true)
    else
        setallowLogin(false)
}

