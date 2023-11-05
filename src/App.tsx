import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import Header from './components/Header';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Header />
        <Home />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
