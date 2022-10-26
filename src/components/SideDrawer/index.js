import React from 'react';
// import { View, Text } from 'react-native';
import { VStack, Text, Box, Avatar, HStack, Pressable } from 'native-base';
import { ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native'

const SideDrawer = () => {
  const navigation = useNavigation()

  const menuItems = [
    {
      id: 0,
      name: 'home-outline',
      icon: 'house',
      iconType: 'material-community',
      screenName: 'Home'
    },
    {
      id: 1,
      name: 'calendar-text-outline',
      icon: 'house',
      iconType: 'material-community',
      screenName: 'Posts'
    },
    {
      id: 2,
      name: 'message-outline',
      icon: 'house',
      iconType: 'material-community',
      screenName: 'Messages'
    },
    {
      id: 3,
      name: 'bell-outline',
      icon: 'house',
      iconType: 'material-community',
      screenName: 'Notifications'
    },
    {
      id: 4,
      name: 'chart-box-outline',
      icon: 'house',
      iconType: 'material-community',
      screenName: 'Statistics'
    },
    {
      id: 5,
      name: 'information-outline',
      icon: 'house',
      iconType: 'material-community',
      screenName: 'PrivacyPolicy'
    }
  ]

  return (
    <VStack safeArea>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9yZXN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80' }}
        resizeMode='cover'
        style={{ width: '100%', height: hp('30%') }}
      >
        <Box backgroundColor='rgba(0, 0, 0, 0.5)' position={'absolute'} w={'100%'} h={'100%'} />
        <VStack alignItems={'center'} justifyContent='center' flex={1}>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Avatar bg="green.500" size="lg" source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }}>
              AJ
            </Avatar>
          </Pressable>

          <Text color={'white'} fontSize={18}>Raghad Al Sadoud</Text>
          <Text color={'white'} fontSize={12}>@raghad</Text>
        </VStack>
      </ImageBackground>

      {/* SECOND SECTION */}
      <Box p={7}>
        {
          menuItems.map(item => (
            <Pressable key={item.id} onPress={() => navigation.navigate(item.screenName)}>
              <HStack space={3} p={3}>
                <Icon name={item.name} type={item.iconType} color='#528bff' />
                <Text fontSize={16}>{item.screenName === 'PrivacyPolicy' ? 'Privacy Policy' : item.screenName}</Text>
              </HStack>
            </Pressable>
          ))
        }
      </Box>


    </VStack>
  );
}

export default SideDrawer
