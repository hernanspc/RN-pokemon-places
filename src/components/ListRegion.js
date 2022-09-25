import React from 'react'
import { StyleSheet, Text, View, useColorScheme, Pressable, Image, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { AVATAR_SIZE, SPACING } from '../utils/constants';

const ListRegion = ({ data, opacity, scale }) => {
    console.log('ListRegion ', data)
    const { name, url, urlImage } = data;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
    // const { title, description, id } = data;

    const handlePress = async (data) => {
        console.log('asas ')

        // navigation.navigate('Detail', { title: title })
        // dispatch(setItemSelected(data));
    }

    return (
        <Animated.View style={{
            flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: .3,
            shadowRadius: 20,
            opacity,
            transform: [{ scale }]
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
                    {name}
                </Text>
            </View>
        </Animated.View>
    )
}

export default ListRegion

const styles = StyleSheet.create({
    container: {
        marginVertical: 5, display: 'flex',
        flexDirection: 'row', width: "100%", height: 70,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#CBCBCB",
        shadowRadius: 10,
    },
    wrapperText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "70%",
        height: "100%",
    },
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