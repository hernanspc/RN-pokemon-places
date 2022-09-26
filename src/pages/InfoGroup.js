import { StyleSheet, Text, View as ViewDefault, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import MyText from '../components/MyText';
import { View } from '../themed/Themed';
import { VStack, Image, ScrollView, Heading, Center, NativeBaseProvider } from "native-base";


const InfoGroup = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    const { region, group } = params;

    const [loading, setLoading] = useState(false)
    const [dateGroup, setDateGroup] = useState([])
    const [countPoke, setCountPoke] = useState(0)

    useEffect(() => {
        navigation.setOptions({
            title: group,
            headerLargeTitle: true,
        });
    }, [navigation]);

    const getInfoGroupSelect = async () => {
        setLoading(true)
        await database()
            .ref(`/grupo/${region}/${group}`)
            .on('value', snapshot => {
                setLoading(false)
                // console.log('snapshot', snapshot?.val())
                setDateGroup(snapshot?.val())
                setCountPoke(Object?.keys(snapshot?.val()?.pokemons).length)
            })
    }

    useEffect(() => {
        getInfoGroupSelect();
    }, [])

    if (loading) {
        return <MyText type="title"> Cargando...  </MyText>
    }

    return (
        <View>
            <Button title="Editar " onPress={() =>
                console.log('editar')
            } />
            <Button title="Eliminar " onPress={() =>
                console.log('eliminar')
            } />

            <View style={{ flexDirection: 'row' }}>
                <MyText type="body"> Nombre  </MyText>
                <MyText type="body">{dateGroup.name}</MyText>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <MyText type="body"> Numero  </MyText>
                <MyText type="body">{countPoke}</MyText>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <MyText type="body"> Tipo  </MyText>
                <MyText type="body">{dateGroup.type}</MyText>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <MyText type="body"> Descripcion  </MyText>
                <MyText type="body">{dateGroup.description}</MyText>
            </View>

            <VStack space={2} justifyContent="center" alignItems="center" safeAreaTop // my={6}
                mb={6}>
                {dateGroup?.pokemons?.map((e, i) => <Image key={i} size={"xl"} resizeMode="cover" source={{
                    uri: e.image
                }} alt={"Alternate Text " + e} />)}
            </VStack>

        </View>
    )
}

export default InfoGroup

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
    },
})