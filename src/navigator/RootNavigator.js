import React, { useState, useEffect } from "react";
import { Button, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthStack from "./AuthStack";
// import Drawer from "./Drawer";
import auth from '@react-native-firebase/auth';
import { setUserData, signIn } from "../features/auth/auth";
import HomeStack from "./HomeStack";

export function RootNavigator() {
    const dispatch = useDispatch();
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        console.log('xxx', user)

        dispatch(
            setUserData(JSON.stringify(user))
        );

        dispatch(
            signIn(user?.email)
        )

        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const { userToken } = useSelector(state => state.auth);

    if (initializing) return <Text>Cargando....</Text>;

    return (
        <>
            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
            {userToken ?
                // <Drawer />
                <HomeStack />
                :
                <AuthStack />
            }
        </>
    );
}