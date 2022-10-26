import React from 'react';
// import { View, Text } from 'react-native';
import { HStack, Pressable, Image, Text, VStack, Avatar } from 'native-base'
import { Icon } from '@rneui/base'

const ListItem = (props) => {
    return (
        <HStack width={'100%'} justifyContent='space-between'>
            <HStack space={3}>
                <Avatar bg="green.500" size="md" source={{
                    uri: props.imageUrl
                }}>
                    AJ
                </Avatar>
                <VStack>
                    <Text>{props.name}</Text>
                    <Text color={'gray.500'}>{props.status}</Text>
                </VStack>
            </HStack>
            <Text color={'gray.500'}>{props.time}</Text>
        </HStack>
    );
}

export default ListItem