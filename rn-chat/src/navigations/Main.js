import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChannelCreation, Channel } from '../screens';
import Home from './Home';

const Stack = createStackNavigator();

const Main = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChannelCreation" component={ChannelCreation} />
      <Stack.Screen name="Channel" component={Channel} />
    </Stack.Navigator>
  );
};

export default Main;
