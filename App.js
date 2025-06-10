import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailsScreen from './screens/ProductDetail.js';
import { Image, Touchable, TouchableOpacity } from 'react-native';

const stack = createStackNavigator();
const logo = require('./assets/Volkswagen_group_logo.png'); // Adjust the path to your logo image

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={({ navigation }) => ({
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={logo}
              style={{width: 180, resizeMode: 'contain' }}
            />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
        })}
      >
        <stack.Screen name="Home" component={HomeScreen}/>
        <stack.Screen name="Details" component={DetailsScreen}/>
      </stack.Navigator>
      </NavigationContainer>
  );
}
