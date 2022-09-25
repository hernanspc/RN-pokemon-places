import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import Animated from 'react-native-reanimated';
import { useGetRegions } from '../hook/useGetRegions.js';
import { SPACING, ITEM_SIZE } from '../utils/constants.js';

const Home = () => {

    const scrollY = React.useRef(new Animated.Value(0)).current;

    const { simpleRegions } = useGetRegions();

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Image
                source={
                    require('../assets/images/background.png')
                }
                style={StyleSheet.absoluteFill}
                blurRadius={4}
            />
            <Animated.FlatList
                data={simpleRegions}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 20 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                renderItem={(({ index, item }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2),
                    ]

                    const opacityinputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 1),
                    ]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    const opacity = scrollY.interpolate({
                        inputRange: opacityinputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    return (
                        <Text>{index}</Text>
                    )
                })}

            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})