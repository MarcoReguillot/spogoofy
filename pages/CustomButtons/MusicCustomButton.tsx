import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface MusicButtonProps {
    onPress: () => void;
    text: string;
    image: ImageSourcePropType;
}

const MusicButton: FC<MusicButtonProps> = ({ onPress, text, image }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
                <Image source={image} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',  // Aligne les éléments en colonne
        alignItems: 'center',
        marginRight: 20,
        marginVertical: 10
    },
    buttonContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white', // couleur du fond du bouton
        // width: 130,
        // height: 130,
    },
    image: {
        borderRadius: 10,
        width: 130, // ajustez la largeur de l'image selon vos besoins
        height: 130, // ajustez la hauteur de l'image selon vos besoins // ajustez la marge à droite de l'image selon vos besoins
    },
    text: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default MusicButton;