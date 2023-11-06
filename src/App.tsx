import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
import Header from './components/Header';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddNote: {noteId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AddNote" component={AddNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

{
  /* <SafeAreaView style={styles.container}> */
}
{
  /*   <Header /> */
}
{
  /*   <Home /> */
}
{
  /* </SafeAreaView>; */
}
