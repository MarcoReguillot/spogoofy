import React from 'react';
import { View, TextInput, Image } from 'react-native';

const SearchInput = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderColor: '#C4C4C4', borderWidth: 1, height: 60, borderRadius: 10 }}>
            <Image
                source={require('../../assets/Icons/search_gray.png')}
                style={{ width: 30, height: 30, marginHorizontal: 10, }}
            />
            <TextInput
                style={{ flex: 1, height: 40, paddingLeft: 10, color: "black" }}
                placeholder="What do you want to listen to?"
            />
        </View>
    );
};

export default SearchInput