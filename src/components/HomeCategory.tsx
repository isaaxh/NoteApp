import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeCategory = () => {
  return (
    <View style={styles.container}>
      <Text>HomeCategory</Text>
    </View>
  );
};

export default HomeCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
