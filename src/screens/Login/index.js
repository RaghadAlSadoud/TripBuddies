import React, { useState } from "react";
import { Alert } from "react-native";
import { VStack, HStack, Text, Input, Button, Icon, Box } from "native-base";
import { Icon as Icons, Tab, TabView } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { updateProfile, getAuth } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false)
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // const handleAuth = () => {

  //     if (username !== 'raghad@tb.com' || password !== 'raghad') return alert('Incorrect username or password')

  //     navigation.navigate('Home')
  // }

  const emptyState = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      emptyState();
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      if (!error) {
        console.log(error);
        return;
      }
      switch (error.code) {
        case "auth/invalid-email": {
          Alert.alert("Invalid email!");
          break;
        }
        case "auth/user-disabled": {
          Alert.alert("This user has been disabled!");
          break;
        }
        case "auth/user-not-found": {
          Alert.alert("This user doesn't exist");
          break;
        }
        case "auth/wrong-password": {
          Alert.alert("Wrong password... mate");
          break;
        }
        default: {
          console.log(error.message);
        }
      }
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword)
        return alert("Password does not match.");

      let userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => {
        setLoading(false);
        switch (error.code) {
          case "auth/invalid-email": {
            Alert.alert("Invalid email!");
            break;
          }
          case "auth/user-disabled": {
            Alert.alert("This user has been disabled!");
            break;
          }
          case "auth/user-not-found": {
            Alert.alert("This user doesn't exist");
            break;
          }
          case "auth/wrong-password": {
            Alert.alert("Wrong password... mate");
            break;
          }
          case "auth/weak-password": {
            Alert.alert("Password should be 6 characters or more.");
            break;
          }
          default: {
            alert(error.message);
            console.log(error.message);
          }
        }
      });
      const user = userCredentials.user;

      setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
      });

      // const auth = getAuth();
      // updateProfile(auth.currentUser, {
      //     displayName: fullName
      // })

      emptyState();
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);

      switch (error.code) {
        case "auth/invalid-email": {
          Alert.alert("Invalid email!");
          break;
        }
        case "auth/user-disabled": {
          Alert.alert("This user has been disabled!");
          break;
        }
        case "auth/user-not-found": {
          Alert.alert("This user doesn't exist");
          break;
        }
        case "auth/wrong-password": {
          Alert.alert("Wrong password... mate");
          break;
        }
        default: {
          console.log(error.message);
        }
      }
      //   console.error("Error signing up: ", error);
    }
  };

  return (
    <VStack safeArea h="100%" w="100%" bg="white">
      {/* <Box justifyContent='center'> */}
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "#0688bf",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="SIGN IN"
          titleStyle={{ fontSize: 12, color: "black" }}
          containerStyle={{ backgroundColor: "white" }}
          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="SIGN UP"
          titleStyle={{ fontSize: 12, color: "black" }}
          containerStyle={{ backgroundColor: "white" }}
          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      {/* <Text bold textAlign={'center'} fontSize={25}>SIGN IN</Text> */}
      {/* </Box> */}
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={{
            backgroundColor: "white",
            width: "100%",
            alignItems: "center",
          }}
        >
          <VStack space={7} mt={10} w={"90%"} alignItems="center">
            <Input
              variant="rounded"
              placeholder="Email"
              placeholderTextColor={"#A4A4A4"}
              style={{ color: "#000" }}
              selectionColor={"white"}
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
            />
            <Input
              type={"password"}
              // type={'password'}
              InputLeftElement={
                <Icon
                  as={
                    <Icons
                      type="material-community"
                      name="lock"
                      color={"#A1A1A1"}
                    />
                  }
                  size="md"
                  m={2}
                  color={"white"}
                />
              }
              variant="rounded"
              placeholder="Password"
              placeholderTextColor={"#A4A4A4"}
              style={{ color: "#000" }}
              selectionColor={"white"}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
            />
            <Text>FORGOT PASSWORD?</Text>
            <Button
              w="100%"
              onPress={handleSignIn}
              //   isLoading={loading}
              //   isDisabled={loading}
            >
              SIGN IN
            </Button>
          </VStack>
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: "white",
            width: "100%",
            alignItems: "center",
          }}
        >
          <VStack space={7} mt={10} w={"90%"} alignItems="center">
            <Input
              variant="rounded"
              placeholder="Name"
              placeholderTextColor={"#A4A4A4"}
              style={{ color: "#000" }}
              selectionColor={"white"}
              value={fullName}
              onChangeText={setFullName}
              autoCorrect={false}
            />
            <Input
              variant="rounded"
              placeholder="Email"
              placeholderTextColor={"#A4A4A4"}
              style={{ color: "#000" }}
              selectionColor={"white"}
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
            />
            <Input
              type={"password"}
              // type={'password'}
              InputLeftElement={
                <Icon
                  as={
                    <Icons
                      type="material-community"
                      name="lock"
                      color={"#A1A1A1"}
                    />
                  }
                  size="md"
                  m={2}
                  color={"white"}
                />
              }
              // InputRightElement={
              //     <Icon
              //         as={<Icons type='material-community' name={showPassword ? 'eye' : 'eye-off'} color={'#A1A1A1'} />}
              //         size="md"
              //         mr={2}
              //         color={'white'}
              //         onPress={() => setShowPassword(!showPassword)}
              //     />
              // }
              variant="rounded"
              placeholder="Password"
              placeholderTextColor={"#A4A4A4"}
              style={{ color: "#000" }}
              selectionColor={"white"}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
            />
            <Input
              type={"password"}
              // type={'password'}
              InputLeftElement={
                <Icon
                  as={
                    <Icons
                      type="material-community"
                      name="lock"
                      color={"#A1A1A1"}
                    />
                  }
                  size="md"
                  m={2}
                  color={"white"}
                />
              }
              variant="rounded"
              placeholder="Confirm Password"
              placeholderTextColor={"#A4A4A4"}
              style={{ color: "#000" }}
              selectionColor={"green"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCorrect={false}
            />
            {/* <Text>FORGOT PASSWORD?</Text> */}
            <Button
              w="100%"
              //   isLoading={loading}
              //   isDisabled={loading}
              onPress={handleSignUp}
            >
              SIGN UP
            </Button>
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
  );
};

export default Login;
