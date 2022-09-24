import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import MapScreen from '../pages/MapScreen';
import PermissionScreen from '../pages/PermissionScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import LoadingScreen from '../pages/LoadingScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {

    const { permissions } = useContext(PermissionsContext)

    if (permissions?.locationStatus === 'unavailable') {
        return <LoadingScreen />
    }

    return (
        <Stack.Navigator
            initialRouteName='PermissionScreen'
            screenOptions={{
                headerShown: false,
                headerLargeTitle: true,
                cardStyle: {
                    backgroundColor: 'red'
                }
            }}
        >

            {
                (permissions?.locationStatus === 'granted') ?
                    <Stack.Screen name="MapScreen" component={MapScreen} />
                    :
                    <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
            }

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})