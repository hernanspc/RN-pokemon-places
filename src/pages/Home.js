import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Home = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Image
                source={
                    require('../assets/images/background.png')
                }
                style={StyleSheet.absoluteFill}
                blurRadius={4}
            />
            <Text>Home</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})