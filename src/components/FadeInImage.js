import React, { useState } from 'react'
import { ActivityIndicator, Animated, ImageErrorEventData, ImageStyle, NativeSyntheticEvent, StyleProp, View } from 'react-native'
import { useAnimation } from '../hook/useAnimation';

export const FadeInImage = ({ uri, style = {} }) => {

    const { opacity, fadeIn } = useAnimation();
    const [isLoading, setIsLoading] = useState(true);

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    const onError = (err) => {
        setIsLoading(false);
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...style
        }}>

            {
                isLoading &&
                <ActivityIndicator
                    style={{ position: 'absolute' }}
                    color="grey"
                    size={30}
                />
            }

            {/* <Image
                source={{ uri }}
                onError={onError}
                onLoad={finishLoading}
                style={{
                    ...style,
                    opacity
                }}
            /> */}
            <Animated.Image
                source={{ uri }}
                onError={onError}
                onLoad={finishLoading}
                style={{
                    ...style,
                    opacity
                }}
            />

        </View>
    )
}
