import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';

const SearchBar = () => {
  return (
    <View>
      <TextInput
        style={[styles.container, globalStyles.text]}
        placeholder="Search here..."
        placeholderTextColor="#454545"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
});

export default SearchBar;
