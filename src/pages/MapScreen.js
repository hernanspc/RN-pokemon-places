import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Map } from '../components/Map';
import { useNavigation } from '@react-navigation/native';
import HeaderDrawer from '../components/HeaderDrawer';

const Stack = createNativeStackNavigator();

const SimpleMap = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // headerLargeTitle: true,
            // headerBackTitle: "Indicadores"
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1, height: StatusBar.currentHeight, }}>
            <Map />
        </View>
    )
}

export default MapScreen = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={{
                animationTypeForReplace: 'pop',
                headerMode: "screen",
                headerTintColor: "#FFF",
                headerStyle: {
                    backgroundColor: "#118c7e",
                },
            }}
        >
            <Stack.Screen
                name="SimpleMap" component={SimpleMap}
                options={{
                    title: 'Mi Ubicacion',
                    headerLeft: () => <HeaderDrawer onPress={() => navigation.openDrawer()} />,
                }}
            />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})