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

const AuthScreen = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignIn = () => {
        // googleLogin();
        console.log('handleSignIn ', handleSignIn)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{
                    uri: 'https://res.cloudinary.com/dd0myqhyb/image/upload/v1664036479/Apps/PokemonPlaces/login.png'
                }}
                style={styles.logo}
            />
            <Text style={styles.text}>RN Social App</Text>

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