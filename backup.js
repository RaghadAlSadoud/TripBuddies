import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import { SideDrawer } from '../components'

import {
  Login,
  Home,
} from '../screens'

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 300,
          }
        }}
        drawerContent={props => <SideDrawer {...props} />}
      >
        <Drawer.Screen name="AppNavigator" component={AppNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export const Navigator = () => MyDrawer();