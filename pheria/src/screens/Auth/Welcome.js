import React, { useEffect, useRef, useState } from 'react'
import { Animated, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { RegisterRequest } from '../../actions/userActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants'
import { checkExistUsername }  from '../../api/user'

const Welcome = ({ navigation, route }) => {
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user.user)
    const [usernameError, setUsernameError] = useState(false)
    const [chagingUsername, setChagingUsername] = useState(false)
    const [username, setUsername] = useState(route.params.name)
    const _loadingDeg = new Animated.Value(0)
    const [loading, setLoading] = useState(false)
    const typingTimeoutRef = useRef()
    useEffect(async () => {
        try{
            const result = await checkExistUsername(username)
            if(result.data.status === 200){
                setUsernameError(false)
            }
            else{
                setUsernameError(true)
            }
        }
        catch(e) {
            setUsernameError(false)
        }
        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        }
    }, [])
    // useEffect(() => {
    //     if (user.logined) {
    //         navigation.navigate('HomeTab')
    //     }
    //     return () => {
    //         //
    //     }
    // }, [user])
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
    const _validateUsername = (usrname) => {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(async() => {
            try{
                const result = await checkExistUsername(usrname)
                if(result.data.status === 200){
                    setUsernameError(false)
                }
                else{
                    setUsernameError(true)
                }
            }
            catch(e) {
                setUsernameError(true)
            }
        }, 200);

    }
    const _onRegister = async () => {
        if (usernameError) return;
        setLoading(true)
        await dispatch(RegisterRequest({
            ...route.params,
            name: username,
        }))
        setLoading(false)

    }
    const _onClickChangeUsername = () => {
        setChagingUsername(true)
    }
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
                    }}>????ng k??...</Text>
                </View>
            </View>
            }
            <View style={styles.centerContainer}>
                <View>
                    <Text style={{
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>{chagingUsername ? '?????i t??n hi???n th???' : 'Ch??o m???ng ?????n v???i pheria'} </Text>
                    {!chagingUsername && <Text style={{
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>@{username}</Text>}
                    <View style={{
                        marginVertical: 10,
                        width: SCREEN_WIDTH * 0.8
                    }}>
                        {!chagingUsername && <Text style={{
                            color: '#666',
                            textAlign: 'center'
                        }}>B???t ?????u chia s??? t??m s??? c???a b???n</Text>}
                        {
                            usernameError && <Text style={{
                                color: 'red',
                                textAlign: 'center'
                            }}>T??n c???a b???n ???? b??? tr??ng, m???i b???n ch???n l???i t??n kh??c</Text>
                        }
                    </View>
                </View>
                {chagingUsername &&
                    <View>
                        <View style={styles.usernameInputWrapper}>
                            <TextInput
                                autoCapitalize="none"
                                onChangeText={e => {
                                    setUsername(e)
                                    _validateUsername(e)
                                }
                                }
                                value={username}
                                style={styles.input}></TextInput>
                            <View style={styles.validIcon}>
                                {usernameError
                                    ? <Text style={{ color: 'red' }}>???</Text>
                                    : <Text style={{ color: 'green' }}>???</Text>
                                }
                            </View>

                        </View>
                        {/* {
                            usernameError && 
                            <View>
                            <Text style={{
                                width: SCREEN_WIDTH * 0.9,
                                color: 'red',
                                marginVertical: 3
                            }}>B???n kh??ng th??? s??? d???ng t??n n??y</Text>
                            </View>
                        } */}
                    </View>
                }
                <TouchableOpacity
                    onPress={_onRegister}
                    activeOpacity={0.8}
                    style={styles.btnNext}>
                    <Text style={{
                        fontWeight: '600',
                        color: '#fff'
                    }}>Ti???p theo</Text>
                </TouchableOpacity>
                {!chagingUsername && <TouchableOpacity
                    onPress={_onClickChangeUsername}
                    activeOpacity={0.8}>
                    <Text style={{
                        fontWeight: '600',
                        color: '#318bfb'
                    }}>?????i t??n hi???n th???</Text>
                </TouchableOpacity>}

            </View>
            <View style={styles.bottomInfo}>
                <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#666'
                }}>Nh???n ti???p t???c, b???n s??? ?????ng ?? v???i 
                    <Text style={{color: '#000'}}>Ch??nh s??ch c???a ch??ng t??i</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default Welcome

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    centerContainer: {
        width: '100%',
        height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    bottomInfo: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    btnNext: {
        width: SCREEN_WIDTH * 0.9,
        height: 46,
        backgroundColor: '#318bfb',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 5
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
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    usernameInputWrapper: {
        height: 44,
        width: SCREEN_WIDTH * 0.9,
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1,
        marginTop: 10
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
        paddingRight: 44 + 15,
    },
    validIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 44,
        top: 0,
        right: 0
    }
})

