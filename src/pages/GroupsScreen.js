import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalizar } from '../utils/function';
import database from '@react-native-firebase/database';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const DATA2 = [
    {
        "description": "Description",
        "name": "Grupo 2",
        "pokemons": [
            [
                "Object"
            ],
            [
                "Object"
            ],
            [
                "Object"
            ]
        ],
        "time": "Mon Sep 26 2022 10:43:52 GMT-0500 (-05)",
        "type": "Agua",
        "user": "hernan"
    },
    {
        "description": "Description",
        "name": "Grupo 3",
        "pokemons": [
            [
                "Object"
            ],
            [
                "Object"
            ],
            [
                "Object"
            ]
        ],
        "time": "Mon Sep 26 2022 10:44:14 GMT-0500 (-05)",
        "type": "Agua",
        "user": "hernan"
    }
]


const GroupsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    const { region } = params;
    const [groupData, setGroupData] = useState([])

    const handleCreate = () => {
        navigation.navigate('CreateSquadScreen', { region: region })
    }

    const getInfo = async () => {
        await database()
            .ref(`/grupo/${region}`)
            .on('value', snapshot => {
                setGroupData(Object?.keys(snapshot?.val()))
                // Object?.keys(snapshot?.val()).map(val => {

                // })
            })
    }

    useEffect(() => {
        getInfo();
    }, [])

    useEffect(() => {
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

    const handleInfoPoke = (item) => {
        navigation.navigate('InfoGroup', { region: region, group: item })
    }

    return (
        <View>
            <Text>Lista de los grupos </Text>
            <FlatList
                data={groupData}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => handleInfoPoke(item)}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>

                )}
                // renderItem={renderItem}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

export default GroupsScreen

const styles = StyleSheet.create({})