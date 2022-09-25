import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import ImageColors from 'react-native-image-colors'

import { FadeInImage } from './FadeInImage.js';

const windowWidth = Dimensions.get('window').width

export const PokemonCard = ({ pokemon }) => {
    // console.log('pokemon ', pokemon)
    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation();

    useEffect(() => {

        ImageColors.getColors(pokemon.image, { fallback: 'grey' })
            .then(colors => {

                if (!isMounted.current) return;

                (colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'grey')
                    : setBgColor(colors.background || 'grey')

            });

        return () => {
            isMounted.current = false
        }

    }, [])

    const handlePressPokemon = () => {
        navigation.navigate('PokemonScreen',
            // {
            // simplePokemon: pokemon,
            // color: bgColor
            // }
        )
    }


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={handlePressPokemon}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>

                {/* <FadeInImage
                    uri={pokemon.image}
                    style={styles.pokemonImage}
                /> */}
                <Image
                    uri={pokemon.image}
                    style={styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
});