import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Animated } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationBar from '../../components/NavigationBar'

const ForgotPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [sendingReset, setSendingReset] = useState(false)
    const [sentReset, setSentReset] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [username, setUsername] = useState('')
    const _loadingDeg = new Animated.Value(0)
    const _loadingDeg2 = new Animated.Value(0)
    const { _loadingDegAnimation2, _loadingDegAnimation } =
        getAnimationActions(_loadingDeg, loading, _loadingDeg2, sendingReset)
    const _checkExistUsername = async () => {
        setLoading(true)
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <NavigationBar title={sentReset ? 'Access Account' : 'Quên mật khẩu'}
                    callback={() => navigation.goBack()}
                />
            </View>
            {sentReset ?
                <View style={styles.afterSentContainer}>
                    <View style={styles.infoLine}>
                        <Icon name="email" size={24} />
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: '500'
                        }}>{sendingReset ? 'Sending Email' : 'Sent Email'}</Text>
                        {sendingReset && <Animated.Image onLayout={_loadingDegAnimation2} style={{
                            marginLeft: 10,
                            height: 24,
                            width: 24,
                            transform: [
                                {
                                    rotate: _loadingDeg2
                                        .interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg',
                                                '360deg']
                                        })
                                }
                            ]
                        }} source={require('../../assets/icons/waiting.png')} />}
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.infoLine}>
                        <Icon name="facebook" size={24} />
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: '500'
                        }}>Login with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.sendingDescription}>
                        <Text style={{
                            fontWeight: "300"
                        }}>An email has been sent to your account's email address. Please check your email to continue. If you are still having problems
                        , please visit the <Text style={{
                                fontWeight: '500'
                            }}>
                                Help Center</Text></Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.centerContainer}>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            textAlign: 'center'
                        }}>Tìm tài khoản</Text>
                        <Text style={{
                            marginVertical: 20,
                            color: '#666',
                            textAlign: 'center'
                        }}>Nhập địa chỉ email đã đăng ký để lấy lại mật khẩu</Text>
                    </View>
                    <View style={styles.formWrapper}>
                        <View style={{
                            ...styles.inputWrapper,
                            borderColor: usernameError ? 'red' : '#ddd'
                        }}>
                            <TextInput
                                value={username}
                                onChangeText={(e) => setUsername(e)}
                                autoFocus={true}
                                placeholder="Nhập địa chỉ email đã đăng ký"
                                autoCapitalize="none"
                                style={styles.input} />
                        </View>
                        <TouchableOpacity
                            onPress={_checkExistUsername}
                            activeOpacity={0.8}
                            style={styles.btnNext}>
                            {!loading && <Text style={{
                                fontWeight: '600',
                                color: '#fff'
                            }}>Tiếp theo</Text>}
                            {loading && <Animated.Image
                                onLayout={_loadingDegAnimation}
                                style={{
                                    ...styles.loadingIcon,
                                    position: 'absolute',
                                    transform: [
                                        {
                                            rotate: _loadingDeg
                                                .interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg',
                                                        '360deg']
                                                })
                                        }
                                    ]
                                }}
                                source={require('../../assets/icons/loading.png')} />}
                        </TouchableOpacity>
                        <View style={styles.divideLine}>
                            <View style={styles.ORtextWrapper}>
                                <Text style={{
                                    color: '#333',
                                    fontWeight: '600'
                                }}>OR</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnLoginWithGoogle}>
                            <Icon name="google" color="#1b6563cc" size={20} />
                            <Text style={{
                                color: '#1b6563cc',
                                fontWeight: 'bold'
                            }}>Đăng nhập bằng Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <TouchableOpacity activeOpacity={1} style={styles.bottomHelp}>
                <Text style={{
                    color: '#1b6563cc'
                }}>Tìm hiểu thêm</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ForgotPassword
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44 - 50
    },
    afterSentContainer: {
        width: '100%',
        padding: 20,
        height: '100%'
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    sendingDescription: {
        marginVertical: 10
    },
    formWrapper: {
        width: SCREEN_WIDTH * 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnNext: {
        marginVertical: 20,
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1b6563cc',
        borderRadius: 5
    },
    inputWrapper: {
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(242,242,242)',
        borderColor: '#ddd',
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 5
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15
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
        backgroundColor: '#fff',
    },
    btnLoginWithGoogle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingIcon: {
        width: 36,
        height: 36,
    },
    bottomHelp: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
function getAnimationActions(_loadingDeg, loading, _loadingDeg2, sendingReset) {
    const _loadingDegAnimation = () => {
        Animated.timing(_loadingDeg, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            if (loading) {
                _loadingDeg.setValue(0)
                _loadingDegAnimation()
            }
        })
    }
    const _loadingDegAnimation2 = () => {
        Animated.timing(_loadingDeg2, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            if (sendingReset) {
                _loadingDeg2.setValue(0)
                _loadingDegAnimation2()
            }
        })
    }
    return { _loadingDegAnimation2, _loadingDegAnimation }
}

