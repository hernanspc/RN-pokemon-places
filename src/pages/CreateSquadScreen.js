import { StyleSheet, Text, Button, View as ViewDefault } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View } from '../themed/Themed'
import MyText from '../components/MyText';
import MyInput from '../components/MyInput';
import colors from '../constants/colors';
import { usePokemonsSpecies } from '../hook/usePokemonsSpecies';

const CreateSquadScreen = () => {
    const navigation = useNavigation();

    const { simpleListPokemon } = usePokemonsSpecies()

    const handleSave = () => {
        console.log('handleSave')
    }

    const handleCancel = () => {
        console.log('handleCancel')
    }

    // console.log('simpleListPokemon ', simpleListPokemon)

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

    const [name, setName] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)

    return (
        <View>

            <MyInput label={'Nombre del Grupo :'} value={name} onChangeText={setName} selectionColor={colors.light.backgroundMovistar} />

            <MyInput label={'Tipo :'} value={type} onChangeText={setType} selectionColor={colors.light.backgroundMovistar} />

            <MyInput label={'Pokedex descripción: '} value={description} onChangeText={setDescription} multiline selectionColor={colors.light.backgroundMovistar} />

            <ViewDefault style={{ flexDirection: 'row', display: 'flex', alignContent: 'center' }} >

                <MyText type="caption" style={{ fontWeight: "bold" }}  > Pokemones seleccionados : </MyText>

                <MyText type="caption" style={{ fontWeight: "bold", }}  >0</MyText>

            </ViewDefault>



        </View>
    )
}

export default CreateSquadScreen

const styles = StyleSheet.create({})