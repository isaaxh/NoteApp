import React from 'react';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveNote from './components/SaveNote';
import GlobalContextProvider, {
  GlobalContextProps,
} from './contexts/GlobalContext';
import useGlobal from './hooks/useGlobal';

export type RootStackParamList = {
  Home: undefined;
  AddNote: {noteId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HeaderSaveNote = () => {
  const {notes} = useGlobal() as GlobalContextProps;
  return <SaveNote notes={notes} />;
};

const AddNoteScreen = () => {
  const {notes} = useGlobal() as GlobalContextProps;
  return <AddNote notes={notes} />;
};

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
          <Stack.Screen name="AddNote" component={AddNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
