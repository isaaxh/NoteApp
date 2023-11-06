import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

type AddNoteBtnProps = {
  onPress: () => void;
};

const AddNoteBtn = ({onPress}: AddNoteBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="plus" color="#454545" size={30} />
    </TouchableOpacity>
  );
};

export default AddNoteBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 60,
    width: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 1,

    // shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});
