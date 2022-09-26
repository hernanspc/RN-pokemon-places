import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import database from '@react-native-firebase/database';

const InfoGroup = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    const { region, group } = params;

    const [dateGroup, setDateGroup] = useState([])

    useEffect(() => {
        navigation.setOptions({
            title: group,
            headerLargeTitle: true,
        });
    }, [navigation]);

    const getInfoGroupSelect = async () => {
        await database()
            .ref(`/grupo/${region}/${group}`)
            .on('value', snapshot => {
                console.log('snapshot', snapshot)
                setDateGroup(snapshot)
            })
    }

    useEffect(() => {
        getInfoGroupSelect();
    }, [])

    return (
        <View>
            <Text>InfoGroup</Text>
        </View>
    )
}

export default InfoGroup

const styles = StyleSheet.create({})