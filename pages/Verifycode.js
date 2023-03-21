import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import firebase from 'firebase/compat/app'

const Verifycode = (props) => {
    const { verifycode, phoneNumber, mode, name } = props.route.params
    const [code, setCode] = useState('');
    const inputRefs = useRef([]);

    const renderInputs = () => {
        // Function to handle input change
        const handleChange = (index, value) => {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode.join(''));

            if (index === 5) {
            } else if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            } else if (!value && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        };

        // Function to handle input focus
        const handleFocus = (index) => {
            const newCode = [...code];
            for (let i = 5; i > index; i--) {
                newCode[i] = '';
            }
            setCode(newCode.join(''));
        };

        const inputs = [];
        for (let i = 0; i < 6; i++) {
            inputs.push(
                <TextInput
                    key={i}
                    ref={(ref) => (inputRefs.current[i] = ref)}
                    value={code[i]}
                    style={styles.input}
                    onChangeText={(value) => handleChange(i, value)}
                    onFocus={() => handleFocus(i)}
                    maxLength={1}
                    keyboardType='number-pad'
                />
            );
        }
        return inputs;
    };

    const confirmcode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verifycode,
            code
        );
        console.log(credential);
        firebase.auth().signInWithCredential(credential)
            .then((userCredential) => {
                console.log('success')
                if (mode === 'signup') {
                    userCredential.user.updateProfile({
                        displayName: name,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={styles.verifycode}>
            <Text style={{ fontSize: 35, color: "white", marginVertical: 30 }}>Enter Code</Text>
            <Text style={{ color: "white", marginVertical: 20, fontSize: 16, width: "85%", textAlign: "center" }}>We have sent you an SMS on +91 {phoneNumber} with 6 digit verification code.</Text>
            <View style={styles.codecon}>
                <View style={styles.code}>
                    {renderInputs()}
                </View>
                <TouchableOpacity style={styles.btn} onPress={confirmcode}>
                    <Text style={{ color: 'white', textAlign: "center", fontWeight: 500 }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: 'white', textAlign: "center", marginVertical: 15 }}>Did not receive the code?</Text>
        </View>
    )
}

export default Verifycode

const styles = StyleSheet.create({
    verifycode: {
        display: "flex",
        justifyContent: "center",
        height: '100%',
        alignItems: "center",
        backgroundColor: '#012E57',
    },
    codecon: {
        margin: 10,
        backgroundColor: "white",
        width: "90%",
        borderRadius: 20,
        height: 200,
        display: "flex",
        justifyContent: "center",
    },
    code: {
        display: "flex",
        margin: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: 40,
        height: 40,
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 8,
    },
    btn: {
        alignSelf: 'center',
        marginVertical: 30,
        paddingVertical: 10,
        backgroundColor: "#f0951f",
        width: "35%",
        borderRadius: 12,
    }
})