import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Header from './Header';
import Home from '../screens/Home';
import {ThemeContextProvider} from '../contexts/ThemeContext';

const Layout = () => (
  <SafeAreaView style={styles.container}>
    <ThemeContextProvider>
      <Header />
      <Home />
    </ThemeContextProvider>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
