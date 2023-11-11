import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Moment from 'moment';
import {GlobalContextProps, noteProps} from '../contexts/GlobalContext';
import useGlobal from '../hooks/useGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// navigation
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import SaveNote from '../components/SaveNote';
import uuid from 'react-uuid';

type AddNoteProps = NativeStackScreenProps<RootStackParamList, 'AddNote'>;

const AddNote = ({}: AddNoteProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const {categories, setCategories} = useGlobal() as GlobalContextProps;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  Moment.locale('en');
  const date = new Date();

  const note: noteProps = {
    noteId: uuid(),
    date: Moment(date).format('DD MMM'),
    title,
    description,
    category: value,
  };

  useEffect(() => {
    const storeNewNote = async () => {
      try {
        const notes = await AsyncStorage.getItem('notes');
        if (notes !== null) {
          const newNotes = JSON.parse(notes);
          newNotes.push(note);
          await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        } else {
          console.log('no notes found');
          const newNotes: noteProps[] = [];
          newNotes.push(note);
          await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        }
      } catch (e) {
        console.log(e);
      }
    };

    const handleSavePress = () => {
      storeNewNote();
      navigation.navigate('Home');
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
        value={value}
        items={categories}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setCategories}
        style={styles.controls}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholderStyle={styles.placeholder}
      />
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
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
