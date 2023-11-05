import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBar';
import AddNoteBtn from '../components/AddNoteBtn';

export default function Home() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <AddNoteBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 10,
  },
});
