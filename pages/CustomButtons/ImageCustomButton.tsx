import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';

interface SongItemProps {
    image: ImageSourcePropType;
    icon: ImageSourcePropType;
    title: string;
    addedBy: string;
    containerStyle?: ViewStyle;
    imageStyle?: ViewStyle;
    titleStyle?: TextStyle;
    addedByStyle?: TextStyle;
    onPress?: () => void;
    onImagePress?: () => void;

}

const SongItem: FC<SongItemProps> = ({ image, icon, title, addedBy, containerStyle, titleStyle, imageStyle, addedByStyle, onPress, onImagePress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.songContainer, containerStyle]}>
            <View style={styles.leftContainer}>
                <Image source={image} style={[styles.songImage, imageStyle]} />
                <View style={styles.songDetails}>
                    <Text style={[styles.songTitle, titleStyle]}>{title}</Text>
                    <Text style={[styles.addedBy, addedByStyle]}>{addedBy}</Text>
                </View>
                <TouchableOpacity onPress={onImagePress}>
                    <Image source={icon} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    songContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: 5
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    songImage: {
        width: 60, // Ajustez la largeur de l'image selon vos besoins
        height: 60, // Ajustez la hauteur de l'image selon vos besoins
        borderRadius: 10, // Utilisez la moitié de la largeur ou de la hauteur pour obtenir un cercle
        marginRight: 10,
    },
    songDetails: {
        flex: 1,
    },
    songTitle: {
        fontWeight: 'bold',
    },
    addedBy: {
        color: 'gray',
    },
    icon: {
        width: 20,
        height: 20,
    }
});

export default SongItem;
