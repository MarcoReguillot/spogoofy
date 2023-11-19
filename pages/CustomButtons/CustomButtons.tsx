import React, { FC, ReactElement } from 'react';
import { View, Text, Pressable, StyleSheet, PressableProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonsProps {
    onPressed: () => void;
    text: string;
    type: 'PRIMARY' | 'SECONDARY' | 'TERCIARY';
    bgColor?: string;
    fgColor?: string;
}

const getContainerStyle = (type: string): StyleProp<ViewStyle> => {
    switch (type) {
        case 'PRIMARY':
            return styles.container_PRIMARY;
        case 'SECONDARY':
            return styles.container_SECONDARY;
        case 'TERCIARY':
        default:
            return styles.container_TERCIARY;
    }
};

const getTextStyle = (type: string): StyleProp<TextStyle> => {
    switch (type) {
        case 'SECONDARY':
            return styles.text_SECONDARY;
        case 'TERCIARY':
            return styles.text_TERCIARY;
        case 'PRIMARY':
        default:
            return styles.text;
    }
};

const CustomButtons: FC<CustomButtonsProps> = ({ onPressed, text, type, bgColor, fgColor }): ReactElement => {
    return (
        <Pressable
            onPress={onPressed}
            style={[
                styles.container,
                getContainerStyle(type),
                bgColor ? { backgroundColor: bgColor } : {}
            ]}
        >
            <Text
                style={[
                    getTextStyle(type),
                    fgColor ? { color: fgColor } : {}
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // padding: 15,
        marginVertical: 10,
        borderRadius: 10
    },
    container_PRIMARY: {
        alignItems: 'center',
        backgroundColor: "#64C3EA",
        padding: 20,

    },
    container_SECONDARY: {
        borderColor: "#3B71F3",
        borderWidth: 2,
    },
    container_TERCIARY: {
        marginVertical: 10,
    },

    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_SECONDARY: {
        color: "#3B71F3",
    },
    text_TERCIARY: {
        color: '#64C3EA',
        textDecorationLine: 'underline',
        fontWeight: '600'
    },
});

export default CustomButtons;
