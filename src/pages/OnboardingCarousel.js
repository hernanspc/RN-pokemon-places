import React, { useContext, useState } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import ViewPager from 'react-native-pager-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import BlackButton from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

const onboardingSlide_1 = require('../assets/lotties/onboard/115410-bussines.json');
const onboardingSlide_2 = require('../assets/lotties/onboard/115088-pessoas-rm-farma.json');
const onboardingSlide_3 = require('../assets/lotties/onboard/washer-waiting.json');

const data = [
    {
        image: onboardingSlide_1,
        text: `Ahorre tiempo haciendo\nseguimiento`,
    },
    {
        image: onboardingSlide_2,
        text: `Manténgase al tanto\nde su negocio`,
    },
    {
        image: onboardingSlide_3,
        text: `Pasa más tiempo haciendo\n las cosas que te gustan`,
    },
];

const OnboardingCarousel = () => {
    const navigation = useNavigation();
    const [selectedPage, setSelectedPage] = useState(0);
    const { permissions, askLocationPermission } = useContext(PermissionsContext)


    const handleNav = async () => {
        await askLocationPermission();
        await AsyncStorage.setItem("@firstOnboard", "true");
        console.log('add AsyncStorage')
        navigation.navigate("Auth");
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#2360B1'
        }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View
                style={[styles.container, {
                    top: Platform.OS === 'android' ? '16%' : '10%',
                }]}>
                <ViewPager
                    style={styles.viewPager}
                    onPageSelected={event => { setSelectedPage(event.nativeEvent.position) }}>
                    <View key="slide_1" style={styles.slide1}>
                        <Lottie autoPlay loop source={data[0].image}
                            style={{
                                width: '85%',
                                alignSelf: 'center',
                            }}
                        />
                        <Text style={[styles.textSlide1, {
                            bottom: Platform.OS === 'android' ? -20 : -40,
                        }]} > {data[0].text}</Text>
                    </View>
                    <View
                        key="slide_2"
                        style={styles.slide2}>
                        <Lottie autoPlay loop source={data[1].image}
                            style={{
                                width: '88%',
                                // bottom: Platform.OS === 'android' ? '0%' : '0%',
                                alignSelf: 'center',
                            }}
                        />
                        <Text style={[styles.textSlide2, {
                            bottom: Platform.OS === 'android' ? -10 : -10,
                        }]} > {data[1].text}</Text>
                    </View>
                    <View
                        key="slide_3"
                        style={styles.slide3}>
                        <Lottie autoPlay loop source={data[2].image}
                            style={{
                                width: '80%',
                                alignSelf: 'center',
                            }}
                        />
                        <Text style={[styles.textSlide3, {
                            bottom: Platform.OS === 'android' ? -10 : -10,
                        }]} > {data[2].text}</Text>
                    </View>
                </ViewPager>
                <View style={styles.circleContainer} >
                    {data.map((_, index) => (
                        <View key={index} style={[styles.circleCarrousel, {
                            backgroundColor: index === selectedPage ? '#54A0FA' : 'white'
                        }]}
                        />
                    ))}
                </View>
            </View>
            {selectedPage === 2 && (
                <>
                    <View style={styles.containerButton}>
                        <BlackButton
                            title="Aceptar y continuar"
                            onPress={handleNav}
                        />
                    </View>
                </>
            )}
        </View>
    )
}

export default OnboardingCarousel

const styles = StyleSheet.create({
    container: {
        height: '55%',
        width: '100%',
    },
    viewPager: {
        height: '100%',
        width: '100%',
    },
    slide1: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    slide2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    slide3: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    textSlide1: {
        fontSize: 23,
        textAlign: 'center',
        color: 'white',
        height: '20%',
    },
    textSlide2: {
        fontSize: 23,
        textAlign: 'center',
        color: 'white',
        height: '20%',
    },
    textSlide3: {
        fontSize: 23,
        textAlign: 'center',
        color: 'white',
        height: '20%',
    },
    circleContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    circleCarrousel: {
        width: 8,
        height: 8,
        borderRadius: RFValue(10),
        marginRight: RFValue(4),
        marginLeft: RFValue(4),
    },
    containerButton: {
        position: 'absolute',
        bottom: 70,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        marginLeft: 100,
        height: 50,
        backgroundColor: 'transparent',
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonDone: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 22,
    }
})