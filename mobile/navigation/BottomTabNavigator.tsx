import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Image } from 'react-native'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabBookScreen from '../screens/TabBookScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<BottomTabParamList>();

export default function StackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Progress"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen 
        headerMode='false'
        name="Progress"
        component={BottomTabNavigator}
        options={{headerTitle: (<Image source={require('../assets/images/logo.png')} style={{justifyContent: 'center', width:145, height: 42}} />)}} 
      />
      <BottomTab.Screen
        tabBarVisible='True'
        name="Book"
        component={TabBookNavigator}
        options={{ headerShown: false }}
        
      />
      <BottomTab.Screen
        name="Profile"
        component={BottomTabNavigator}
        options={{headerTitle: (<Image source={require('../assets/images/logo.png')} style={{justifyContent: 'center', width:145, height: 42}} />)}}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Progress"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Progress"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="book" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="face-profile" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Progress"
        component={TabOneScreen}
      />
    </TabOneStack.Navigator>
  );
}

const TabBookStack = createStackNavigator();

export function TabBookNavigator() {
  return (
    <TabBookStack.Navigator>
      <TabBookStack.Screen
        name="Book"
        component={TabBookScreen}
        options={{headerTitle: (<Image source={require('../assets/images/logo.png')} style={{justifyContent: 'center', width:145, height: 42}} />)}}  
      />
    </TabBookStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Profile"
        component={TabTwoScreen}
      />
    </TabTwoStack.Navigator>
  );
}
