import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import Animated from 'react-native-reanimated';
import ListRegion from '../components/ListRegion.js';
import { useGetRegions } from '../hook/useGetRegions.js';
import { SPACING, ITEM_SIZE } from '../utils/constants.js';

const Home = () => {

    const { simpleRegions } = useGetRegions();

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Image
                source={
                    require('../assets/images/background.png')
                }
                style={StyleSheet.absoluteFill}
                blurRadius={3}
            />
            <Animated.FlatList
                data={simpleRegions}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 20 }}
                renderItem={(({ index, item }) => {
                    return (
                        <ListRegion key={index} data={item} />
                    )
                })}

            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})