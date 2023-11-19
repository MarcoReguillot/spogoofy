import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';

interface PlaylistItemProps {
    image: ImageSourcePropType;
    title: string;
    containerStyle?: ViewStyle;
    imageStyle?: ViewStyle;
    titleStyle?: TextStyle;
    onPress?: () => void;

}

const PlaylistItem: FC<PlaylistItemProps> = ({ image, title, containerStyle, titleStyle, imageStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.playlistContainer, containerStyle]}>
            <View style={styles.leftContainer}>
                <Image source={image} style={[styles.playlistImage, imageStyle]} />
                <View style={styles.playlistDetails}>
                    <Text style={[styles.playlistTitle, titleStyle]}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    playlistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playlistImage: {
        width: 50, // Ajustez la largeur de l'image selon vos besoins
        height: 50, // Ajustez la hauteur de l'image selon vos besoins
        marginRight: 10,
    },
    playlistDetails: {
        flex: 1,
    },
    playlistTitle: {
        fontWeight: 'bold',
    },
});

export default PlaylistItem;
