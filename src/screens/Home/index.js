import React, { useState, useRef, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { VStack, HStack, Box, Button, Text, Image, Pressable } from 'native-base'
import { Icon, SearchBar } from '@rneui/base'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation, DrawerActions } from '@react-navigation/native'
import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
import { db } from '../../../firebaseConfig'
import { updateDoc, getDoc, doc, getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Home = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState("");

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const sendPushNotification = async () => {
        try {

            const auth = getAuth();
            const user = auth.currentUser;
            const userRef = doc(db, "users", user.uid);
            const usersRef = collection(db, "users");
            const userProfile = await getDoc(userRef);
            const buddies = await getDocs(usersRef);

            let buddyTokens = []
            buddies.forEach(doc => {
                if (doc.data().expoPushToken !== userProfile.data().expoPushToken) {
                    buddyTokens.push(doc.data().expoPushToken)
                }
            })

            await axios.post('https://exp.host/--/api/v2/push/send', {
                to: buddyTokens,
                sound: "default",
                title: `${userProfile.data().fullName} has started a new trip! 🗺️`,
                body: `${userProfile.data().fullName} is looking for buddies to join the trip.`,
            },
                {
                    Headers: {
                        'host': 'exp.host',
                        'accept': 'application/json',
                        'accept-encoding': 'gzip, deflate',
                        'content-type': 'application/json',
                    }
                }).then(() => {
                    Alert.alert('Notification sent successfully!', 'A notification has been sent to your buddies to gather for your new trip.')
                })
        } catch (error) {
            console.log(error)
        }
    }

    // const schedulePushNotification = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Raghad has started a new trip! 🗺️",
    //             body: 'Raghad is going to visit the pyramids and looking for buddies to join the trip.',
    //             data: { data: 'goes here' },
    //         },
    //         trigger: { seconds: 2 },
    //     });
    // }

    const registerForPushNotificationsAsync = async () => {

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        let token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('token', token);

        // SAVE TOKEN IN DB
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // console.log(user)
                await updateDoc(doc(db, "users", user.uid), {
                    expoPushToken: token,
                });
            } else {
                console.log('user not found')
            }
        });


        return token

    }

    // const registerForPushNotificationsAsync = async () => {
    //     let token;

    //     if (Platform.OS === 'android') {
    //         await Notifications.setNotificationChannelAsync('default', {
    //             name: 'default',
    //             importance: Notifications.AndroidImportance.MAX,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: '#FF231F7C',
    //         });
    //     }

    //     if (Device.isDevice) {
    //         const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //         let finalStatus = existingStatus;
    //         if (existingStatus !== 'granted') {
    //             const { status } = await Notifications.requestPermissionsAsync();
    //             finalStatus = status;
    //         }
    //         if (finalStatus !== 'granted') {
    //             alert('Failed to get push token for push notification!');
    //             return;
    //         }
    //         token = (await Notifications.getExpoPushTokenAsync()).data;
    //         console.log(token);
    //     } else {
    //         // alert('Must use physical device for Push Notifications');
    //     }

    //     return token;
    // }

    // BUDDIES LOCATION
    const [buddies, setBuddies] = useState([
        {
            title: 'Mustafa',
            description: 'Show history',
            coords: {
                latitude: -36.8547821,
                longitude: 174.63176,
            },
            imageUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        },
        {
            title: 'Raghad',
            description: 'Show history',
            coords: {
                latitude: -36.8692715,
                longitude: 174.6241367,
            },
            imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
        {
            title: 'Zahra',
            description: 'Show history',
            coords: {
                latitude: -36.8672715,
                longitude: 174.6141367,
            },
            imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        },
        {
            title: 'Wadi',
            description: 'Show history',
            coords: {
                latitude: -36.8612715,
                longitude: 174.6101367,
            },
            imageUrl: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
    ])

    return (
        <VStack flex={1} alignItems='center' justifyContent={'center'}>



            {/* MAP START */}
            <Box w='100%' h='100%'>

                <HStack w={'100%'} justifyContent='center' alignItems={'center'} position={'absolute'} top={12} zIndex={10}>
                    <Pressable w={'15%'} h='100%' bg='white' justifyContent={'center'} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} borderBottomLeftRadius={15} borderTopLeftRadius={15} >
                        <Icon name='menu' />
                    </Pressable>

                    <Box w={'75%'} >
                        <SearchBar
                            placeholder="Type Here..."
                            onChangeText={setSearch}
                            value={search}
                            containerStyle={{ backgroundColor: 'white', borderBottomWidth: 0, borderTopWidth: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                            inputContainerStyle={{ backgroundColor: '#F2F2F2' }}
                        // style={{ width: '100%' }}
                        />
                    </Box>

                </HStack>

                <HStack w={'100%'} justifyContent='center' alignItems={'center'} position={'absolute'} bottom={5} zIndex={10}>
                    <Pressable onPress={async () => sendPushNotification()} p={2} bgColor='cyan.600' borderRadius={50} w={50} h={50} alignItems='center' justifyContent={'center'}>
                        <Text fontSize={22} color='white'>G</Text>
                    </Pressable>

                </HStack>

                <MapView
                    showsUserLocation
                    initialRegion={{
                        latitude: -36.8611379,
                        longitude: 174.6283727,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Marker
                        coordinate={{
                            latitude: -36.8611379,
                            longitude: 174.6283727,
                        }}
                        title={'aaa'}
                        description={'vvv'}
                    />
                    {
                        buddies.map((item, index) => (
                            <Marker
                                key={index}
                                coordinate={item.coords}
                                title={item.title}
                                description={item.description}
                                // onPress={() => navigation.navigate('Profile')}
                                onCalloutPress={() => navigation.navigate('Profile')}
                            // image={{uri: item.imageUrl}}
                            // style={{width: 50, height: 50}}
                            >
                                <Image
                                    alt={item.title}
                                    source={{ uri: item.imageUrl }}
                                    // style={{ width: 50, height: 50 }}
                                    style={{ width: 26, height: 28, borderRadius: 99 }}
                                    resizeMode='center'
                                    resizeMethod='resize'
                                />
                            </Marker>
                        ))
                    }

                    <Polyline
                        coordinates={[
                            { latitude: -36.8611379, longitude: 174.6283727 },
                            { latitude: -36.8631379, longitude: 174.6273727 },
                            { latitude: -36.8651379, longitude: 174.6263727 },
                        ]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />

                </MapView>

            </Box>
            {/* MAP END */}

        </VStack>
    );
}

export default Home
