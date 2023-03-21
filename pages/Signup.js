import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import React, { useState, useRef } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase/compat/app';

const Signup = ({navigation}) => {
    const [user, setuser] = useState("")
    const [phone, setphone] = useState("")
    const recaptchaverifier = useRef(null)

    const sendVerificationCode = async () => {
        try {
            const phoneprovider = new firebase.auth.PhoneAuthProvider();
            phoneprovider.verifyPhoneNumber("+91" + phone, recaptchaverifier.current)
                .then((setVerificationId) => {
                    console.log(setVerificationId)
                    navigation.push('Verifycode', { verifycode: setVerificationId, phoneNumber: phone, mode: "login", name: user })
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <SafeAreaView style={styles.cont}>
        <View style={styles.signup}>
            <View style={{ alignSelf: "center", marginBottom: 50 }}>
                <Text style={{ fontSize: 35, color: "white" }}>Sign Up</Text>
            </View>
            <FirebaseRecaptchaVerifierModal ref={recaptchaverifier} firebaseConfig={firebaseConfig} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="User Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setuser(text)}
                    value={user}
                    cursorColor="black"
                />
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
        </View>
        // </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    cont: {
        flex: 1,
    },
    signup: {
        display: "flex",
        justifyContent: "center",
        height: '100%',
        backgroundColor: '#012E57',
    },
    inputView: {
        marginVertical: 20,
        borderColor: "white",
        borderRightWidth: 1,
        borderLeftWidth: 0,
        width: "80%",
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        position: "relative",
        left: -10,
    },
    inputText: {
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignSelf: "center",
        borderBottomWidth: 0.4,
        borderBottomColor: "black",
    },
    arrow: {
        width: "20%",
        alignSelf: "flex-end",
        position: "absolute",
        top: "53%",
        left: "73%",
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