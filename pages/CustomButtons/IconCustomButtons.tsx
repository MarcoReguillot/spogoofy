import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface ImageButtonProps {
    onPress: () => void;
    text: string;
    imageSource: ImageSourcePropType;
}

const ImageButton: FC<ImageButtonProps> = ({ onPress, text, imageSource }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
                <Image source={imageSource} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white', // couleur du fond du bouton
        padding: 10,
        borderRadius: 10,
        width: 40,
        height: 40,
        borderColor: "#e8e8e8",
        borderWidth: 1,
    },
    image: {
        width: 20, // ajustez la largeur de l'image selon vos besoins
        height: 20, // ajustez la hauteur de l'image selon vos besoins
        marginRight: 10, // ajustez la marge à droite de l'image selon vos besoins
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 32,
        marginHorizontal: 20
    },
});

export default ImageButton;