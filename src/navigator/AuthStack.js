import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../pages/AuthScreen';
import OnboardingCarousel from '../pages/OnboardingCarousel';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Platform } from 'react-native';

const Auth = createStackNavigator();

export default function AuthStack() {

  useEffect(() => {
    if (Platform === 'android') {
      GoogleSignin.configure({
        // webClientId: Platform === 'ios' ? '1076046321611-jfpk32941r7aom0fmdsc02otj4ld593s.apps.googleusercontent.com' : '1076046321611-09449lp6fhfd3gpslodmju6uioc143e5.apps.googleusercontent.com'
        // webClientId: '1076046321611 - jfpk32941r7aom0fmdsc02otj4ld593s.apps.googleusercontent.com'
        webClientId: '1076046321611-09449lp6fhfd3gpslodmju6uioc143e5.apps.googleusercontent.com',
      });
    }

  }, [])


  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
      }}
    >
      <Auth.Screen name="Auth" component={AuthScreen} />
      <Auth.Screen name="OnboardingCarousel" component={OnboardingCarousel} />
    </Auth.Navigator>
  );
}
