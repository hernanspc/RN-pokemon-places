import { StyleSheet, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View } from '../themed/Themed'

const CreateSquadScreen = () => {
    const navigation = useNavigation();

    const handleSave = () => {
        console.log('handleSave')
    }

    const handleCancel = () => {
        console.log('handleCancel')
    }


    useEffect(() => {
        navigation.setOptions({
            title: "Crea tu equipo",
            headerLargeTitle: true,
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={handleSave}
                        title="Guardar"
                    />
                    <Button
                        onPress={handleCancel}
                        title="Cancel"
                    />
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View>

            <Text>CreateSquadScreen</Text>
        </View>
    )
}

export default CreateSquadScreen

const styles = StyleSheet.create({})