import * as React from 'react';
import { Button, StatusBar, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import MapScreen from '../pages/MapScreen';
// import Home from '../pages/Home';
// import Detail from '../pages/Detail';
// import StackHome from './StackHome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();
export default function MyDrawer() {

    return (
        // <>
        //     <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        //     <Drawer.Navigator initialRouteName="Home"
        //         screenOptions={{
        //             headerShown: false,
        //         }}
        //     >
        //         <Drawer.Screen
        //             options={{
        //                 title: 'Inicio',
        //                 headerTitleStyle: {
        //                     fontWeight: 'bold',
        //                 },
        //                 drawerIcon: (config) => (
        //                     <MaterialCommunityIcons
        //                         name="trending-up"
        //                         size={22}
        //                         color="#0D85FB"
        //                     />
        //                 ),

        //             }}
        //             name="StackHome" component={StackHome}
        //         />
        //         <Drawer.Screen
        //             options={{
        //                 title: 'Mapa',
        //                 headerTitle: "Mi Ubicacion",
        //                 headerTitleStyle: {
        //                     fontWeight: 'bold',
        //                 },
        //                 drawerIcon: (config) => (
        //                     <Feather name="map-pin" size={24} color="black" />
        //                 )
        //             }}
        //             name="Mapa" component={MapScreen} />
        //     </Drawer.Navigator>
        // </>
        <Text>dRWE</Text>

    );
}