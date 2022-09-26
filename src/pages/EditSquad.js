import { StyleSheet, Text, View as ViewDefault, TextInput, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from '../themed/Themed';
import MyText from '../components/MyText';
import database from '@react-native-firebase/database';
import colors from '../constants/colors';
import MyInput from '../components/MyInput';

const EditSquad = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    const { region, group } = params;

    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState([])

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')



    const getInfoGroupSelect = async () => {
        setLoading(true)
        await database()
            .ref(`/grupo/${region}/${group}`)
            .on('value', snapshot => {
                setInfo(snapshot?.val())

                setName(snapshot?.val().name)
                setType(snapshot?.val().type)
                setDescription(snapshot?.val().description)

            })
    }

    useEffect(() => {
        getInfoGroupSelect();
    }, [])

    const actuallyData = () => {
        database()
            .ref(`/grupo/${region}/${group}`)
            .update({
                description: description,
                name: name,
                type: type,
            })
            .then(() => {
                Alert.alert('Datos actualizados correctamente')
                console.log('Data updated.')
                navigation.navigate('GroupsScreen', {
                    region: region,
                })
            });

    }

    return (
        <View>
            <ViewDefault style={{ flexDirection: 'column' }}>

                <MyInput label={'Nombre :'} value={name} onChangeText={setName}
                    selectionColor={colors.light.backgroundMovistar} />

                <MyInput label={'Tipo :'} value={type} onChangeText={setType}
                    selectionColor={colors.light.backgroundMovistar} />

                <MyInput label={'Pokedex descripción: '} value={description}
                    onChangeText={setDescription} multiline selectionColor={colors.light.backgroundMovistar} />

            </ViewDefault>

            <Button title='Actualizar Datos' onPress={actuallyData} />

        </View>
    )
}

export default EditSquad

const styles = StyleSheet.create({})