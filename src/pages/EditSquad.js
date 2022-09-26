import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const EditSquad = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;
    console.log('edit ', params)

    return (
        <View>
            <Text>EditSquad</Text>
        </View>
    )
}

export default EditSquad

const styles = StyleSheet.create({})