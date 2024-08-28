import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './pages/home';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator screenOptions={({route}) => {
    tabBarIcon
  }}>
    <Tab.Screen name="home" component={Home}/>
    <Tab.Screen name="Search" component={Home} />
    <Tab.Screen name="Add" component={Home} />
    <Tab.Screen name="Calendar" component={Home} />
    <Tab.Screen name="Profile" component={Home} />
  </Tab.Navigator>

);