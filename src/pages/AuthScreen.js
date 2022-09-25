import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthScreen = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignIn = async () => {
        console.log('handleSignIn ',)

        try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)

                // Use it only when user Sign's up, 
                // so create different social signup function
                .then(() => {
                    //Once the user creation has happened successfully, we can add the currentUser into firestore
                    //with the appropriate details.
                    // console.log('current User', auth().currentUser);
                    firestore().collection('users').doc(auth().currentUser.uid)
                        .set({
                            fname: '',
                            lname: '',
                            email: auth().currentUser.email,
                            createdAt: firestore.Timestamp.fromDate(new Date()),
                            userImg: null,
                        })
                        //ensure we catch any errors at this stage to advise us if something does go wrong
                        .catch(error => {
                            console.log('Something went wrong with added user to firestore: ', error);
                        })
                })
                //we need to catch the whole sign up process if it fails too.
                .catch(error => {
                    console.log('Something went wrong with sign up: ', error);
                });
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/images/pokemonLogo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>RN Social App</Text>
            <Image
                source={require('../assets/images/pokeball.gif')}
                style={styles.img}
            />
            {/* <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            /> */}

            {/* <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity> */}


            <View>
                {/* <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => fbLogin()}
                    /> */}

                <SocialButton
                    buttonTitle="Sign In with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={handleSignIn}
                />
            </View>


            {/* <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => {
                    console.log('create account')
                }}>
                <Text style={styles.navButtonText}>
                    Don't have an acount? Create here
                </Text>
            </TouchableOpacity> */}
        </ScrollView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 120,
        width: "100%",
        resizeMode: 'cover',
        // backgroundColor: 'red'
    },
    img: {
        // height: 120,
        // width: "100%",
        resizeMode: 'cover',
        // backgroundColor: 'red'
    },
    text: {
        // fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        // fontFamily: 'Lato-Regular',
    },
});