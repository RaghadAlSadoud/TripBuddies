import React, { useState } from 'react'
import { VStack, HStack, Text, Input, Button, Icon, Box } from 'native-base'
import { Icon as Icons, Tab, TabView } from "@rneui/themed"
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigation = useNavigation()

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [index, setIndex] = React.useState(0);

    const handleAuth = () => {

        if (username !== 'raghad@tb.com' || password !== 'raghad') return alert('Incorrect username or password')

        navigation.navigate('Home')
    }

    return (
        <VStack safeArea h='100%' w='100%' bg='white' >
            {/* <Box justifyContent='center'> */}
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: '#0688bf',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="SIGN IN"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    containerStyle={{ backgroundColor: 'white' }} 
                // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="SIGN UP"
                    titleStyle={{ fontSize: 12, color: 'black'  }}
                    containerStyle={{ backgroundColor: 'white' }} 
                // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
            </Tab>
            {/* <Text bold textAlign={'center'} fontSize={25}>SIGN IN</Text> */}
            {/* </Box> */}
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
                    <VStack space={7} mt={10} w={'90%'} alignItems='center'>
                        <Input
                            variant="rounded"
                            placeholder="Username"
                            placeholderTextColor={'#A4A4A4'}
                            style={{ color: '#000' }}
                            selectionColor={'white'}
                            value={username}
                            onChangeText={setUsername}
                            autoCorrect={false}

                        />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            // type={'password'}
                            InputLeftElement={
                                <Icon
                                    as={<Icons type='material-community' name="lock" color={'#A1A1A1'} />}
                                    size="md"
                                    m={2}
                                    color={'white'}
                                />
                            }
                            InputRightElement={
                                <Icon
                                    as={<Icons type='material-community' name={showPassword ? 'eye' : 'eye-off'} color={'#A1A1A1'} />}
                                    size="md"
                                    mr={2}
                                    color={'white'}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            variant="rounded"
                            placeholder="Password"
                            placeholderTextColor={'#A4A4A4'}
                            style={{ color: '#000' }}
                            selectionColor={'white'}
                            value={password}
                            onChangeText={setPassword}
                            autoCorrect={false}
                        />
                        <Text>FORGOT PASSWORD?</Text>
                        <Button w='100%' onPress={handleAuth}>SIGN IN</Button>
                    </VStack>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
                    <VStack space={7} mt={10} w={'90%'} alignItems='center'>
                        <Input
                            variant="rounded"
                            placeholder="Name"
                            placeholderTextColor={'#A4A4A4'}
                            style={{ color: '#000' }}
                            selectionColor={'white'}
                            value={fullName}
                            onChangeText={setFullName}
                            autoCorrect={false}

                        />
                        <Input
                            variant="rounded"
                            placeholder="Email"
                            placeholderTextColor={'#A4A4A4'}
                            style={{ color: '#000' }}
                            selectionColor={'white'}
                            value={username}
                            onChangeText={setUsername}
                            autoCorrect={false}

                        />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            // type={'password'}
                            InputLeftElement={
                                <Icon
                                    as={<Icons type='material-community' name="lock" color={'#A1A1A1'} />}
                                    size="md"
                                    m={2}
                                    color={'white'}
                                />
                            }
                            InputRightElement={
                                <Icon
                                    as={<Icons type='material-community' name={showPassword ? 'eye' : 'eye-off'} color={'#A1A1A1'} />}
                                    size="md"
                                    mr={2}
                                    color={'white'}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            variant="rounded"
                            placeholder="Password"
                            placeholderTextColor={'#A4A4A4'}
                            style={{ color: '#000' }}
                            selectionColor={'white'}
                            value={password}
                            onChangeText={setPassword}
                            autoCorrect={false}
                        />
                        {/* <Text>FORGOT PASSWORD?</Text> */}
                        <Button w='100%'>SIGN UP</Button>
                    </VStack>
                </TabView.Item>
            </TabView>
            {/* <VStack flex={0.7} space={5} mt={10} w={'90%'} alignItems='center'>
                <Input
                    variant="rounded"
                    placeholder="Username"
                    placeholderTextColor={'#A4A4A4'}
                    style={{ color: '#000' }}
                    selectionColor={'white'}
                    value={username}
                    onChangeText={setUsername}
                    autoCorrect={false}

                />
                <Input
                    type={showPassword ? 'text' : 'password'}
                    // type={'password'}
                    InputLeftElement={
                        <Icon
                            as={<Icons type='material-community' name="lock" color={'#A1A1A1'} />}
                            size="md"
                            m={2}
                            color={'white'}
                        />
                    }
                    InputRightElement={
                        <Icon
                            as={<Icons type='material-community' name={showPassword ? 'eye' : 'eye-off'} color={'#A1A1A1'} />}
                            size="md"
                            mr={2}
                            color={'white'}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                    variant="rounded"
                    placeholder="Password"
                    placeholderTextColor={'#A4A4A4'}
                    style={{ color: '#000' }}
                    selectionColor={'white'}
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                />
                <Text>FORGOT PASSWORD?</Text>
                <Button w='100%'>SIGN IN</Button>
            </VStack> */}
        </VStack>
    )
}

export default Login