import "react-native-gesture-handler";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages';
import Favorites from './pages/favorites';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { createStackNavigator } from '@react-navigation/stack';
import Detail from './pages/detail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from "react-redux";
import rootReducer from './reducers/store'
import { configureStore } from '@reduxjs/toolkit';
import PushNotification from "react-native-push-notification";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const store = configureStore({
  reducer: rootReducer
})
function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="App" component={HomeScreen} />
      <Stack.Screen  name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3d5a80',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen options={{headerShown:false}} name="Home" component={Root} />
          <Tab.Screen options={{headerShown:false}} name="Favorites" component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}