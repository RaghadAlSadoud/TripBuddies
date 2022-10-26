import React from 'react';
// import { View, Text } from 'react-native';
import { HStack, Pressable } from 'native-base'
import { Icon } from '@rneui/base'

const Header = (props) => {
    return (
        <HStack width={'100%'} justifyContent='space-between' px={5}>
            <Icon name='arrow-left' type='material-community' size={24} onPress={props.backBtn} color={props.isWhite && 'white'} />
            <Icon name='filter-variant' type='material-community' size={24} color={props.isWhite && 'white'} />
        </HStack>
    );
}

export default Header