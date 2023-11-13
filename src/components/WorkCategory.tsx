import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WorkCategory = () => {
  return (
    <View style={styles.container}>
      <Text>Only work stuff</Text>
    </View>
  );
};

export default WorkCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
