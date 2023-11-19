import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface GenreInputButtonProps {
    onPress: () => void;
    text: string;
    imageStyle?: ViewStyle;
}

const GenreInputButton: React.FC<GenreInputButtonProps> = ({ onPress, text, imageStyle }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.rectangle, imageStyle]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        width: 200,
        height: 100,
        justifyContent: 'flex-start',
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 10
    },
});

export default GenreInputButton;
