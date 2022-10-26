import React from 'react';
// import { View, Text } from 'react-native';
import { VStack, HStack, Box, Button, Text, ScrollView } from 'native-base'
import { Icon } from '@rneui/base'
import { Header, ListItem } from '../../components'
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
    const navigation = useNavigation()
    return (
        <VStack safeArea flex={1}>
            <Header backBtn={() => navigation.goBack()} />
            <ScrollView>
                <VStack px={6} my={2} space={7}>
                    <Text fontSize={34}>Notifications</Text>
                    <ListItem name='Raghad Al Sadoud' status='shared an ETA' time='1m ago' imageUrl='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
                    <ListItem name='Mustafa' status='started a trip' time='3m ago' imageUrl='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' />
                    <ListItem name='Zahra' status='booked a cab' time='8m ago' imageUrl='https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' />
                </VStack>
            </ScrollView>
        </VStack>
    );
}

export default Notifications