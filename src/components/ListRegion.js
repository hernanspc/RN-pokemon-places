import React from 'react'
import { StyleSheet, Text, View, useColorScheme, Pressable, Image, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { AVATAR_SIZE, SPACING } from '../utils/constants';
import { capitalizar } from '../utils/function';
import { selectItemPokemon } from '../features/pokemon/pokemon';

const ListRegion = ({ data }) => {
    const { name, url, urlImage } = data;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
    // const { title, description, id } = data;

    const handlePress = async (value) => {
        navigation.navigate('GroupsScreen', {
            name: name,
        })
        dispatch(selectItemPokemon(value));
    }

    return (
        <TouchableOpacity
            onPress={() => handlePress(data)}
        >

            <View style={{
                flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: .3,
                shadowRadius: 20,
            }}>
                <Image
                    source={{ uri: urlImage }}
                    style={{
                        width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2,
                    }}
                />
                <View style={styles.wrapperIcon} >
                    <Text style={{ fontSize: 22, fontWeight: "700" }} >
                        {capitalizar(name)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListRegion

const styles = StyleSheet.create({
    wrapperIcon: {
        // backgroundColor: "pink",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "30%",
        height: "100%",
    }
})