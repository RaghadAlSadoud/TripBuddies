import React from 'react';
import { ImageBackground } from 'react-native';
import { VStack, HStack, Box, Button, Text, Card, Divider, ScrollView } from 'native-base'
import { Icon } from '@rneui/base'
import { Header, PostCard } from '../../components'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation()
    return (
        <VStack w='100%' h='100%'>

            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
                resizeMode='cover'
                style={{ width: '100%', height: hp('45%') }}
            >
                <Box backgroundColor='rgba(0, 0, 0, 0.4)' position={'absolute'} w={'100%'} h={'100%'} />
                <Box safeArea />
                <Header isWhite={true} backBtn={() => navigation.goBack()} />
            </ImageBackground>

            <VStack w={'100%'} h={'60%'} bottom='0' borderRadius={15} bg='gray.100' position={'absolute'} p={8}>
                <HStack justifyContent={'space-between'} alignItems='center'>
                    <Text fontSize={26}>Raghad Al Sadoud</Text>
                    <Box bg='gray.600' py={1.5} px={4} borderRadius={10}>
                        <Text color={'white'} fontSize={12}>FOLLOW</Text>
                    </Box>
                </HStack>

                <Text color={'gray.500'}>New Zealand</Text>
                <Text color={'gray.500'}>18 years</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <VStack space={4}>
                        <Card mt={5} bg='white'>
                            <VStack space={4} py={3}>
                                <HStack justifyContent={'space-evenly'}>
                                    <VStack>
                                        <Icon name='message-outline' type='material-community' color={'#528bff'} />
                                        <Text color={'gray.500'}>Chat</Text>
                                    </VStack>
                                    <VStack>
                                        <Icon name='image-outline' type='material-community' color={'#528bff'} />
                                        <Text color={'gray.500'}>Gallery</Text>
                                    </VStack>
                                    <VStack>
                                        <Icon name='map-marker-outline' type='material-community' color={'#528bff'} />
                                        <Text color={'gray.500'}>Location</Text>
                                    </VStack>
                                </HStack>
                                <Divider />
                                <HStack justifyContent={'space-evenly'}>
                                    <VStack>
                                        <Icon name='account-multiple' type='material-community' color={'#528bff'} />
                                        <Text color={'gray.500'}>Friends</Text>
                                    </VStack>
                                    <VStack>
                                        <Icon name='tune-vertical' type='material-community' color={'#528bff'} />
                                        <Text color={'gray.500'}>Settings</Text>
                                    </VStack>
                                    <VStack>
                                        <Icon name='bell-outline' type='material-community' color={'#528bff'} />
                                        <Text color={'gray.500'}>Notifications</Text>
                                    </VStack>
                                </HStack>
                            </VStack>
                        </Card>

                        <PostCard goToProfile={() => navigation.navigate('Profile')} name='Raghad Al Sadoud' imageUrl='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />

                    </VStack>
                </ScrollView>



            </VStack>
        </VStack>
    );
}

export default Profile