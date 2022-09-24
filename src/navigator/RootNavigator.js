import React, { useState, useEffect } from "react";
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthStack from "./AuthStack";
import Drawer from "./Drawer";

export function RootNavigator() {
    const { userToken } = useSelector(state => state.auth);

    return (
        <>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            {userToken ?
                // <Drawer />
                <Text>Loageado</Text>
                :
                <AuthStack />
            }
        </>
    );
}