import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalizar } from '../utils/function';

const GroupsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;

    const handleCreate = () => {
        navigation.navigate('CreateSquadScreen')
    }

    useEffect(() => {
        navigation.setOptions({
            title: capitalizar(params?.name),
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