import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';

type SaveNoteProps = {
  onPress: () => void;
};

const SaveNote = ({onPress}: SaveNoteProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={globalStyles.text}>Save</Text>
    </TouchableOpacity>
  );
};

export default SaveNote;
