import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Home from '../pages/Home'
import GroupsScreen from '../pages/GroupsScreen';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/auth/auth';
import CreateSquadScreen from '../pages/CreateSquadScreen';
import InfoGroup from '../pages/InfoGroup';
import EditSquad from '../pages/EditSquad';

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
            <Stack.Screen name="CreateSquadScreen" component={CreateSquadScreen} />
            <Stack.Screen name="InfoGroup" component={InfoGroup} />
            <Stack.Screen name="EditSquad" component={EditSquad}
                options={{
                    title: 'Editar grupo pokemon',
                }}
            />
        </Stack.Navigator>
    );
}