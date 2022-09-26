import { StyleSheet, Text, Button, View as ViewDefault, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from '../themed/Themed'
import MyText from '../components/MyText';
import MyInput from '../components/MyInput';
import colors from '../constants/colors';
import { usePokemonsSpecies } from '../hook/usePokemonsSpecies';
import { PokemonCard } from '../components/PokemonCard.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { deleteAllPokemons } from '../features/pokemon/pokemon';

const CreateSquadScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { params } = route;
    const { region } = params;

    const { top } = useSafeAreaInsets();
    const { simpleListPokemon, getList } = usePokemonsSpecies()

    const [name, setName] = useState('')
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)
    const { pokemons } = useSelector(state => state.pokemon);
    const { userToken } = useSelector(state => state.auth);


    const handleSave = async () => {
        const countAll = Object.keys(pokemons).length
        const min = 3;
        const max = 6;

        if (name) {
            if (countAll >= min && countAll <= max) {
                await database()
                    .ref(`/grupo/${region}/${Date.now()}`)
                    .set({
                        name: name,
                        type: type,
                        description: description,
                        pokemons: pokemons,
                        user: userToken,
                        time: Date(),
                    })
                    .then(() => {
                        dispatch(deleteAllPokemons());
                        console.log('Data set.');
                    });
                Alert.alert('Group created correctly')
                navigation.navigate('GroupsScreen', { region: region })
            } else {
                Alert.alert('Debes considerar Minimo 3 y Maximo 6 pokemones')
            }
        } else {
            Alert.alert('El campo nombre es Obligatorio')
        }




    }

    const handleCancel = () => {
        console.log('handleCancel')
        dispatch(deleteAllPokemons())
        setName('')
        setType('')
        setDescription('')
    }

    useEffect(() => {
        navigation.setOptions({
            title: "Crea tu equipo",
            headerLargeTitle: true,
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    {/* <Button
                        onPress={handleSave}
                        title="Guardar"
                    /> */}
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View>
            <MyInput label={'Nombre del Equipo :'} value={name}
                onChangeText={setName} selectionColor={colors.light.backgroundMovistar} />

            <MyInput label={'Tipo :'} value={type} onChangeText={setType}
                selectionColor={colors.light.backgroundMovistar} />

            <MyInput label={'Pokedex descripción: '} value={description}
                onChangeText={setDescription} multiline selectionColor={colors.light.backgroundMovistar} />

            <ViewDefault style={{ flexDirection: 'row', display: 'flex', alignContent: 'center' }} >

                <MyText type="caption" style={{ fontWeight: "bold" }}  > Pokemones seleccionados : </MyText>

                <MyText type="caption" style={{ fontWeight: "bold", }}  >{Object.keys(pokemons).length}</MyText>

            </ViewDefault>

            <Button
                onPress={handleSave}
                title="Agregar"
            />

            <Button
                onPress={handleCancel}
                title="Cancel"
            />

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
                        <PokemonCard pokemon={item}
                        // totalSelect={totalSelect}
                        />
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