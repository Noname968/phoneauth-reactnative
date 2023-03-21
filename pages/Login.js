import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import Loginimg from '../Loginimg.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase/compat/app';

const Login = ({ navigation }) => {
    const [phone, setphone] = useState("")
    const recaptchaverifier = useRef(null)

    const sendVerificationCode = async () => {
        try {
            const phoneprovider = new firebase.auth.PhoneAuthProvider();
            phoneprovider.verifyPhoneNumber("+91" + phone, recaptchaverifier.current)
                .then((setVerificationId) => {
                    console.log(setVerificationId)
                    navigation.push('Verifycode', { verifycode: setVerificationId, phoneNumber: phone, mode: "login" })
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.cont}>
            <View style={styles.login}>
                <Image source={Loginimg} style={styles.img} />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Mobile no."
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setphone(text)}
                        value={phone}
                        cursorColor="black"
                    />
                </View>
                <View style={styles.arrow}>
                    <TouchableOpacity style={styles.btn} onPress={sendVerificationCode}>
                        <AntDesign name="arrowright" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <FirebaseRecaptchaVerifierModal ref={recaptchaverifier} firebaseConfig={firebaseConfig} />
                <View style={{ textAlign: "center", alignSelf: "center", marginTop: 60 }}>
                    <Text style={{ color: "white" }}>New User? <Text style={{ color: 'white', fontWeight: 700, fontSize: 18 }} onPress={() => navigation.navigate('Signup')}> Signup</Text>
                    </Text>
                </View>
                <View style={{ textAlign: "center", alignSelf: "center", marginTop: 60 }}>
                    <Text style={{ color: "white" }}>By Signing Up, you agree to T&C</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    cont: {
        flex: 1,
    },
    login: {
        height: '100%',
        backgroundColor: '#012E57',
    },
    img: {
        width: '100%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginBottom: 20,
    },
    inputView: {
        marginVertical: 20,
    },
    inputText: {
        borderColor: "white",
        borderWidth: 2,
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 15,
        width: "80%",
        alignSelf: "center",
        borderRadius: 10,
    },
    arrow: {
        width: "20%",
        alignSelf: "flex-end"
    },
    btn: {
        borderRadius: 50,
        backgroundColor: "#f0951f",
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
})