import React, { useState } from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, TextInput,
    KeyboardAvoidingView,
    Animated,
    SafeAreaView
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Easing } from 'react-native'
import { navigation } from '../../navigations/rootNavigation'

const Register = () => {
    const _loadingDeg = new Animated.Value(0)
    const _loadingOpacity = new Animated.Value(0)
    const [email, setEmail] = useState('')
    const [step, setStep] = useState(1)
    
    const _onValidatedStep1 = (values) => {
        setStep(step + 1)
        setEmail(values.email)
    }
    const _onValidatedStep2 = (values) => {
        const params = {
            email,
            name: values.name,
            password: values.password,
        }
        navigation.navigate('Welcome', params)
    }
    const _startLoadingAnimation = (times) => {
        _loadingDeg.setValue(0)
        _loadingOpacity.setValue(1)
        setTimeout(() => {
            _loadingOpacity.setValue(0)
        }, 400 * times + 100)

        Animated.timing(_loadingDeg, {
            toValue: times,
            duration: 400 * times,
            useNativeDriver: true,
            easing: Easing.linear
        }).start()
    }
    const SchemaStep1 = yup.object().shape({
        email: yup.string().email().required()
    }, [['phone', 'email']])
    const SchemaStep2 = yup.object().shape({
        name: yup.string().matches(/[a-zA-Z]+/).required(),
        password: yup.string().min(6, 'Mật khẩu cần ít nhất 6 ký tự').required(),
    })
    
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="height" style={{
                ...styles.centerContainer,
                height: step > 1
                    ? step === 2
                        ? SCREEN_HEIGHT - 100 - STATUS_BAR_HEIGHT :
                        'auto'
                    : SCREEN_HEIGHT - 50 - STATUS_BAR_HEIGHT,
                width: step === 3 ? '100%' : 0.9 * SCREEN_WIDTH
            }}>
                {step === 1 && (
                    <Formik
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={_onValidatedStep1}
                        validationSchema={SchemaStep1} initialValues={{
                            phone: '',
                            email: '',
                        }}>
                        {(formikProps) => (
                            <>
                                <View>
                                    <Image source={require('../../assets/icons/account.png')} />
                                </View>
                                <View style={styles.usernameTypesWrapper}>
                                    <View style={styles.navigationTabs}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{
                                                ...styles.navigationTab,
                                            }}>
                                            <Text style={{
                                                ...styles.tabTitle,
                                                color: '#fff'
                                            }}>Địa chỉ email</Text>
                                        </TouchableOpacity>
                                        <View style={{
                                            ...styles.activeTypeLine,
                                            left: 0
                                        }} />
                                    </View>
                                    <View style={styles.usernameForm}>
                                        <View style={styles.useEmail}>
                                            <View style={{
                                                ...styles.inputWrapper,
                                                borderColor: formikProps.touched.email
                                                    && formikProps.errors.email ? 'red' : '#ddd'
                                            }}>
                                                <TextInput
                                                    onBlur={formikProps.handleBlur('email')}
                                                    onChangeText={(e) => {
                                                        formikProps.handleChange('email')(e.toLowerCase())
                                                        formikProps.setFieldTouched('email', false, false)
                                                    }}
                                                    autoFocus={true}
                                                    placeholder="Địa chỉ Email"
                                                    keyboardType="email-address"
                                                    returnKeyType="done"
                                                    style={styles.input}
                                                    value={formikProps.values.email} />

                                                <TouchableOpacity
                                                    onPress={
                                                        () => formikProps
                                                            .setFieldValue('email', '')
                                                    }
                                                    style={styles.btnReset}>
                                                    {formikProps.values.email.length > 0
                                                        && <Text>✕</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {formikProps.touched.email
                                                && formikProps.errors.email &&
                                                <Text style={styles.errorText}>
                                                    Vui lòng nhập đúng địa chỉ email.
                                            </Text>
                                            }
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                _startLoadingAnimation(1)
                                                formikProps.handleSubmit()
                                            }}
                                            activeOpacity={0.8} style={styles.btnNextStep}>
                                            <Animated.Text style={{
                                                opacity: Animated.subtract(1, _loadingOpacity),
                                                fontWeight: '600',
                                                color: '#fff'
                                            }}>Tiếp theo</Animated.Text>
                                            <Animated.Image
                                                style={{
                                                    ...styles.loadingIcon,
                                                    position: 'absolute',
                                                    opacity: _loadingOpacity,
                                                    transform: [
                                                        {
                                                            rotate: _loadingDeg
                                                                .interpolate({
                                                                    inputRange: [0, 100],
                                                                    outputRange: ['0deg',
                                                                        '36000deg']
                                                                })
                                                        }
                                                    ]
                                                }}
                                                source={
                                                    require('../../assets/icons/loading.png')
                                                } />

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}

                    </Formik>
                )}
                {step === 2 && (
                    <Formik onSubmit={_onValidatedStep2}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validationSchema={SchemaStep2}
                        initialValues={{
                            name: '',
                            password: '',
                        }}
                    >
                        {(formikProps) => (
                            <View style={styles.step2Wrapper}>
                                <View style={styles.step2Title}>
                                    <Text 
                                    autoCapitalize="none"
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>Tên và mật khẩu</Text>
                                </View>
                                <View style={styles.step2FormWrapper}>
                                    <View style={styles.formGroupWrapper}>
                                        <View style={{
                                            ...styles.inputWrapper,
                                            borderColor: formikProps.touched.name
                                                && formikProps.errors.name ? 'red' : '#ddd'
                                        }}>
                                            <TextInput
                                                autoCorrect={false}
                                                autoCapitalize='none'
                                                onBlur={formikProps.handleBlur('name')}
                                                onChangeText={(e) => {
                                                    formikProps.handleChange('name')(e)
                                                    formikProps.setFieldTouched('name', false, false)
                                                    formikProps.setErrors({ name: undefined })
                                                }}
                                                autoFocus={true}
                                                placeholder="Tên hiển thị"
                                                keyboardType="default"
                                                returnKeyType="done"
                                                style={styles.input}
                                                value={formikProps.values.name} />

                                            <TouchableOpacity
                                                onPress={
                                                    () => formikProps
                                                        .setFieldValue('name', '')
                                                }
                                                style={styles.btnReset}>
                                                {formikProps.values.name.length > 0
                                                    && <Text>✕</Text>}
                                            </TouchableOpacity>
                                        </View>
                                        {formikProps.touched.name
                                            && formikProps.errors.name &&
                                            <Text style={styles.errorText}>
                                                Vui lòng nhập tên hiển thị.
                                            </Text>
                                        }
                                    </View>
                                    <View style={styles.formGroupWrapper}>
                                        <View style={{
                                            ...styles.inputWrapper,
                                            borderColor: formikProps.touched.password
                                                && formikProps.errors.password ? 'red' : '#ddd'
                                        }}>
                                            <TextInput
                                                onBlur={formikProps.handleBlur('password')}
                                                onChangeText={(e) => {
                                                    formikProps.handleChange('password')(e)
                                                    formikProps
                                                        .setFieldTouched('password', false, false)
                                                    formikProps.setErrors({ name: undefined })
                                                }}
                                                secureTextEntry={true}
                                                placeholder="Mật khẩu"
                                                keyboardType="default"
                                                returnKeyType="done"
                                                style={styles.input}
                                                value={formikProps.values.password} />

                                            <TouchableOpacity
                                                onPress={
                                                    () => formikProps
                                                        .setFieldValue('password', '')
                                                }
                                                style={styles.btnReset}>
                                                {formikProps.values.password.length > 0
                                                    && <Text>✕</Text>}
                                            </TouchableOpacity>
                                        </View>
                                        {formikProps.touched.password
                                            && formikProps.errors.password &&
                                            <Text style={styles.errorText}>
                                                Mật khẩu cần ít nhất 6 ký tự nhé!!!
                                            </Text>
                                        }
                                        
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            _startLoadingAnimation(1)
                                            formikProps.handleSubmit()
                                        }}
                                        activeOpacity={0.8} style={styles.btnNextStep}>
                                        <Animated.Text style={{
                                            opacity: Animated.subtract(1, _loadingOpacity),
                                            fontWeight: '600',
                                            color: '#fff'
                                        }}>Tiếp tục</Animated.Text>
                                        <Animated.Image
                                            style={{
                                                ...styles.loadingIcon,
                                                position: 'absolute',
                                                opacity: _loadingOpacity,
                                                transform: [
                                                    {
                                                        rotate: _loadingDeg
                                                            .interpolate({
                                                                inputRange: [0, 100],
                                                                outputRange: ['0deg',
                                                                    '36000deg']
                                                            })
                                                    }
                                                ]
                                            }}
                                            source={
                                                require('../../assets/icons/loading.png')
                                            } />

                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        )}
                    </Formik>
                )}
            </KeyboardAvoidingView>
            {
                step === 2 &&
                <View style={styles.syncContactDescription}>
                    <Text style={{
                        color: '#666',
                        fontSize: 12
                    }}>Tên hiển thị cần tránh để tên thật để đảm bảo bạn được ẩn danh trên app
                        <Text style={{
                            color: '#000'
                        }}> Tìm hiểu thêm</Text>
                    </Text>
                </View>
            }
            {
                step === 1 && < TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={1}
                    style={styles.btnLogin}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: '600'
                    }}>
                        <Text style={{
                            fontWeight: '500',
                            color: '#333'
                        }}>Bạn đã có tài khoản?
                            </Text> Đăng nhập.</Text>
                </TouchableOpacity>
            }
        </SafeAreaView >
    )
}

export default React.memo(Register)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    centerContainer: {
        width: SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    usernameTypesWrapper: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationTabs: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 0.5,
        position: 'relative'
    },
    activeTypeLine: {
        height: 1,
        width: '50%',
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0
    },
    navigationTab: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    tabTitle: {
        fontWeight: '600'
    },
    usernameForm: {
        marginVertical: 20,
        width: '100%'
    },
    usePhone: {
        width: '100%'
    },
    useEmail: {
        width: '100%'
    },
    inputWrapper: {
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 1,
        width: '100%',
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 44,
        paddingHorizontal: 15,
        backgroundColor: 'rgb(242,242,242)'
    },
    loadingIcon: {
        width: 36,
        height: 36,
    },
    btnPhoneCode: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 80,
    },
    phoneCodeTitleWrapper: {
        paddingVertical: 5,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        paddingHorizontal: 10
    },
    inputPhone: {
        width: '100%',
        height: 44,
        fontSize: 16,
        paddingRight: 44,
        paddingLeft: 90,
        backgroundColor: 'rgb(242,242,242)'
    },
    btnReset: {
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0
    },
    errorText: {
        color: 'red',
        marginVertical: 5,
    },
    btnNextStep: {
        width: '100%',
        height: 46,
        backgroundColor: '#1b6563cc',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 5
    },

    //STEP2 STYLES
    step2Wrapper: {
        width: '100%'
    },
    step2Title: {
        marginVertical: 25,
        alignItems: 'center'
    },
    step2FormWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    formGroupWrapper: {
        marginVertical: 7.5,
        width: '100%'
    },
    checkbox: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        width: 18,
        borderRadius: 2,
        borderWidth: 3
    },
    syncContactDescription: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0.05 * SCREEN_WIDTH
    },
    //STEP 3 STYLES
    step3ScrollView: {
        width: '100%',
    },
    step3Wrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    birthdayIcon: {
        height: 64,
        width: 64
    },
    birthdayInputWrapper: {
        width: '100%',
        paddingHorizontal: 0.05 * SCREEN_WIDTH
    },
    birthdayInput: {
        position: 'relative',
        backgroundColor: 'rgb(242,242,242)',
        width: '100%',
        height: 44,
        justifyContent: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    currentYear: {
        position: 'absolute',
        paddingHorizontal: 15,
        height: 44,
        justifyContent: 'center',
        top: 0,
        right: 0
    },
    //
    btnLogin: {
        height: 50,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})