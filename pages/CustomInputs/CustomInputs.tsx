import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomInputsProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    securityTextEntry?: boolean;
    title: string;
}

const CustomInputs: React.FC<CustomInputsProps> = ({ value, setValue, placeholder, securityTextEntry, title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {title}*
            </Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={securityTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: "100%",
        // borderColor: "#e8e8e8",
        // borderWidth: 1,
        // borderRadius: 5,
        // paddingHorizontal: 5,
        marginVertical: 5,
        // height: 40, // Adjust the height as needed
    },
    input: {
        backgroundColor: 'white',
        width: "100%",
        borderColor: "#C4C4C4",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
        height: 60,
        paddingLeft: 15,
        fontStyle: 'italic', // Set the text style to italic
        color: '#888',
    },
    text: {
        fontWeight: '800'
    }
})

export default CustomInputs;
