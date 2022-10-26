import React from 'react';
// import { View, Text } from 'react-native';
import { VStack, HStack, Box, Button, Text, Image, Card, ScrollView } from 'native-base'
import { Icon } from '@rneui/base'
import { Header, PostCard } from '../../components'
import { useNavigation } from '@react-navigation/native'

const Posts = () => {
    const navigation = useNavigation()

    return (
        <VStack safeArea flex={1}>
            <Header backBtn={() => navigation.goBack()} />
            <ScrollView>
                <VStack px={6} my={2} space={3}>
                    <Text fontSize={34}>Posts</Text>
                    <PostCard goToProfile={() => navigation.navigate('Profile')} name='Raghad Al Sadoud' imageUrl='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
                    <PostCard postImage='https://images.squarespace-cdn.com/content/v1/55dc9bade4b05820bf02d414/1566606638535-Q1OJ7YZWBU8PP0FYBJEF/image-asset.jpeg?format=1500w' name='Wadi' imageUrl='https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
                    <PostCard name='Mustafa' imageUrl='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' />
                    <PostCard name='Zahra' imageUrl='https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' />
                </VStack>
            </ScrollView>
        </VStack>
    );
}

export default Posts
