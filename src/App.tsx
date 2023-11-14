import React from 'react';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalContextProvider from './contexts/GlobalContext';
import EditNote from './screens/EditNote';

export type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  EditNote: {
    id: string;
    date: string;
    title: string;
    category: string;
    content: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={{
              title: 'Add Note',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="EditNote"
            component={EditNote}
            options={{
              title: 'Edit Note',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
