import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalizar } from '../utils/function';
import database from '@react-native-firebase/database';

const GroupsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    const { region } = params;

    const handleCreate = () => {
        navigation.navigate('CreateSquadScreen', { region: region })
    }

    useEffect(() => {
        database()
            .ref(`/grupo/${region}`)
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
            });

        navigation.setOptions({
            title: capitalizar(region),
            headerLargeTitle: true,
            headerRight: () => (
                <Button
                    onPress={handleCreate}
                    title="Crear Equipo"
                />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Lista de los grupos </Text>
        </View>
    )
}

export default GroupsScreen

const styles = StyleSheet.create({})