import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Home from '../pages/Home'
import GroupsScreen from '../pages/GroupsScreen';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/auth/auth';

const Stack = createStackNavigator();

export default function HomeStack() {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            dispatch(signOut())
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Stack.Navigator
        >
            <Stack.Screen name="Home" component={Home}
                options={{
                    title: 'Regiones',
                    headerRight: () => (
                        <Button
                            onPress={handleLogout}
                            title="Logout"
                        />
                    ),
                }}
            />
            <Stack.Screen name="GroupsScreen" component={GroupsScreen} />

        </Stack.Navigator>
    );
}