import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from './pages/home'

const Tab = createBottomTabNavigator();

export default () => (
  Tab.Navigator tabBar={props=><CustomTabBar {}}

);
