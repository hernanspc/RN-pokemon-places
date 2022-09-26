import { StyleSheet, Text, View as ViewDefault, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalizar } from '../utils/function';
import database from '@react-native-firebase/database';
import MyText from '../components/MyText';
import colors, { tintColorIos } from '../constants/colors';
import { View } from '../themed/Themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';

const emptyGift = require('../assets/lotties/onboard/empty-file.json');

const GroupsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    const { region } = params;
    const [groupData, setGroupData] = useState([])
    const [nameGroup, setNameGroup] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCreate = () => {
        navigation.navigate('CreateSquadScreen', { region: region })
    }

    const getInfo = async () => {
        await database()
            .ref(`/grupo/${region}`)
            .on('value', snapshot => {
                setLoading(false)
                if (snapshot?.val()) {
                    setGroupData(Object?.keys(snapshot?.val()))
                } else {
                    setGroupData([])
                    return
                }

            })
    }

    useEffect(() => {
        setLoading(true)
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

    const handleEditPoke = (item) => {
        navigation.navigate('EditSquad', { region: region, group: item })
    }

    const handleEditGroup = (item) => {
        Alert.alert(
            "Alerta",
            "Realmente desea eliminar?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        await database().ref(`/grupo/${region}/${item}`).remove()
                    },
                    style: "destructive"
                }
            ]
        );
    }

    if (loading) {
        return <MyText type="title"> Cargando Grupos...  </MyText>
    }

    return (
        <View>
            <MyText type="title">Lista de Grupos: </MyText>
            <FlatList
                data={groupData}
                renderItem={({ item, index }) => (

                    <View style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        marginVertical: 20,
                        borderRadius: 10,
                        // backgroundColor: 'red',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,

                        // elevation: 6,
                        flexDirection: 'row'
                    }}>
                        <View style={{ width: '50%', }}>
                            <MyText type="caption" >{item}</MyText>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleInfoPoke(item)}
                        >
                            <MaterialIcons style={{ marginHorizontal: 20, }} name="info-outline" size={30} color={tintColorIos} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleEditPoke(item)}
                        >
                            <Feather style={{ marginHorizontal: 20, }} name="edit" size={30} color={tintColorIos} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleEditGroup(item)}
                        >
                            <MaterialCommunityIcons style={{ marginHorizontal: 20, }} name="delete-outline" size={30} color={tintColorIos} />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <>
                        <Text type="caption">Aun no hay registros...</Text>
                        <Lottie autoPlay loop source={emptyGift}
                            style={{
                                width: '100%',
                                // bottom: Platform.OS === 'android' ? '0%' : '0%',
                                alignSelf: 'center',
                            }}
                        />
                    </>
                }
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

export default GroupsScreen

const styles = StyleSheet.create({})