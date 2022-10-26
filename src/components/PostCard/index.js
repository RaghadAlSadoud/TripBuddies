import React from 'react';
// import { View, Text } from 'react-native';
import { VStack, HStack, Box, Button, Text, Image, Avatar, Card, Pressable } from 'native-base'
import { Divider } from '@rneui/base'
import { Icon } from '@rneui/base'

const PostCard = (props) => {
    return (
        <Card bg='white'>
            <VStack space={3}>
                <HStack alignItems={'center'} justifyContent='space-between'>
                    <HStack space={3} alignItems='center'>
                        <Pressable onPress={props.goToProfile}>
                            <Avatar bg="green.500" size="md" source={{
                                uri: props.imageUrl
                            }}>
                                AJ
                            </Avatar>
                        </Pressable>
                        <VStack>
                            <Text>{props.name}</Text>
                            <Text color={'gray.500'} fontSize={12}>11 Oct</Text>
                        </VStack>
                    </HStack>

                    {/* <Icon name='chevron-down' type='material-community' color='gray' /> */}
                </HStack>
                {
                    props.postImage ? (
                        <>
                            <Text>Believe you can and you're halfway there.</Text>
                            <Image
                                alt={'image'}
                                source={{ uri: props.postImage }}
                                width='100%'
                                height={150}
                                resizeMode='cover'
                                borderRadius={15}
                            />
                        </>
                    ) : (
                        <Text>Today I visited the Pyramids in Egypt and I had a great time there. I took many selfies near the Sphinx and I advice everyone to visit the desert restaurant.</Text>
                    )
                }
                <Divider />
                <HStack justifyContent={'space-between'}>
                    <Icon name='share' type='material' color={'gray'} />
                    <HStack space={5}>
                        <HStack space={1}>
                            <Text color={'gray.500'}>{Math.trunc(Math.random() * 999)}</Text>
                            <Icon name='message-text' type='material-community' color={'gray'} />
                        </HStack>
                        <HStack space={1}>
                            <Text color={'gray.500'}>{Math.trunc(Math.random() * 999)}</Text>
                            <Icon name='heart-outline' type='material-community' color={'gray'} />
                        </HStack>
                    </HStack>
                </HStack>
            </VStack>
        </Card >
    );
}

export default PostCard