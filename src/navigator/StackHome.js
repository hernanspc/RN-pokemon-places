import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from '../pages/AuthScreen';
import OnboardingCarousel from '../pages/OnboardingCarousel';
import React from 'react';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import HeaderDrawer from "../components/HeaderDrawer";
import { useNavigation } from "@react-navigation/native";
import GraphScreen from "../pages/GraphScreen";

const Stack = createNativeStackNavigator();

export default function StackHome() {
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
                name="Home" component={Home}
                options={{
                    title: 'Indicadores',
                    headerLeft: () => <HeaderDrawer onPress={() => navigation.openDrawer()} />,
                }}
            />

            <Stack.Screen
                name="Detail"
                component={Detail} />
            <Stack.Screen
                name="GraphScreen"
                component={GraphScreen} />

        </Stack.Navigator>
    );
}
