import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../pages/AuthScreen';
import OnboardingCarousel from '../pages/OnboardingCarousel';
import { GoogleSignin } from '@react-native-community/google-signin';

const Auth = createStackNavigator();

export default function AuthStack() {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1076046321611-09449lp6fhfd3gpslodmju6uioc143e5.apps.googleusercontent.com',
    });
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
