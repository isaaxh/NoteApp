import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Moment from 'moment';
import {GlobalContextProps, noteProps} from '../contexts/GlobalContext';
import useGlobal from '../hooks/useGlobal';
import uuid from 'react-uuid';
import useAsyncStorage from '../hooks/useAsyncStorage';
import SaveNote from '../components/SaveNote';
// navigation
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type AddNoteProps = NativeStackScreenProps<RootStackParamList, 'AddNote'>;

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);

  const {categories, setCategories} = useGlobal() as GlobalContextProps;
  const {storeNewNote} = useAsyncStorage();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  Moment.locale('en');
  const formattedDate = Moment(new Date()).format('DD MMM');

  const note: noteProps = {
    id: uuid(),
    date: formattedDate,
    title,
    description,
    category,
  };

  useEffect(() => {
    const handleSavePress = () => {
      storeNewNote(note);
      navigation.popToTop();
    };

    navigation.setOptions({
      headerRight: () => <SaveNote onPress={handleSavePress} />,
    });
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[globalStyles.text, styles.controls, styles.container]}
        placeholder="Add Title"
        placeholderTextColor="#454545"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[globalStyles.text, styles.controls, styles.container]}
        placeholder="Add Description"
        placeholderTextColor="#454545"
        multiline={true}
        numberOfLines={3}
        value={description}
        onChangeText={setDescription}
      />
      <DropDownPicker
        open={open}
        value={category}
        items={categories}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setCategories}
        style={styles.controls}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholderStyle={styles.placeholder}
      />
    </View>
  );
};

export default AddNote;

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  controls: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dropDownTouchable: {
    flexDirection: 'row',
    height: 40,
    padding: 10,
  },
  dropDownItem: {
    padding: 10,
    flexDirection: 'row',
  },
  dropDownContainer: {
    borderColor: '#E5E5E5',
  },
  placeholder: {
    color: '#454545',
  },
});
