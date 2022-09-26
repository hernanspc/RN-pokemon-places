import { StyleSheet, Text, Button, View as ViewDefault, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View } from '../themed/Themed'
import MyText from '../components/MyText';
import MyInput from '../components/MyInput';
import colors from '../constants/colors';
import { usePokemonsSpecies } from '../hook/usePokemonsSpecies';
import { PokemonCard } from '../components/PokemonCard.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

const CreateSquadScreen = () => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();
    const { simpleListPokemon, getList } = usePokemonsSpecies()

    const [countSelect, setCountSelect] = useState(0)

    const { pokemons } = useSelector(state => state.pokemon);

    const totalSelect = (count) => {
        console.log('count ', count + 1)
        setCountSelect(count + 1)
    }

    const handleSave = () => {
        totalSelect();
        count = count + 1;
        if (count < 3) {
            Alert.alert('Por favor seleccione como mínimo 3 pokemones')
        } else if (count <= 6) {
            console.log('IS ok')
        } else {
            Alert.alert('No puede agregar mas de 6 pokemones')
        }

        // database()
        //     .ref('/users/123')
        //     .set({
        //         name: 'Ada Lovelace',
        //         age: 31,
        //     })
        //     .then(() => console.log('Data set.'));

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

                <MyText type="caption" style={{ fontWeight: "bold", }}  >{countSelect}</MyText>

            </ViewDefault>

            <View
                style={{ alignItems: 'center' }}
            >

                <FlatList
                    data={simpleListPokemon}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokedex </Text>
                    )}

                    renderItem={({ item, index }) => (
                        // <Text>{index}</Text>
                        <PokemonCard pokemon={item} totalSelect={totalSelect} />
                    )}

                    // infinite scroll
                    onEndReached={getList}
                    onEndReachedThreshold={0.4}

                    ListFooterComponent={(
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={20}
                            color="grey"
                        />
                    )}
                />
            </View>

        </View>
    )
}

export default CreateSquadScreen

const styles = StyleSheet.create({})