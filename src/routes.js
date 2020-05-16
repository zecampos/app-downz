import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import colors from './styles/colors';

import Home from './pages/Home';
import Historico from './pages/Historico';
import Contribua from './pages/Contribua';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home';
              } else if (route.name === 'Historico') {
                iconName = focused
                  ? 'ios-refresh-circle'
                  : 'ios-refresh-circle';
              } else if (route.name === 'Contribua') {
                iconName = focused ? 'ios-thumbs-up' : 'ios-thumbs-up';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.gray,
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Historico" component={Historico} />
          <Tab.Screen name="Contribua" component={Contribua} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
