import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Home from './pages/Home';
import {ThemeContextProvider} from './contexts/ThemeContext';
import Header from './components/Header';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeContextProvider>
        <Header />
        <Home />
      </ThemeContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
