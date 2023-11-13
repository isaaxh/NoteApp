import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import useGlobal from '../hooks/useGlobal';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {styles} from '../screens/AddNote';
import {GlobalContextProps, noteProps} from '../contexts/GlobalContext';
import Moment from 'moment';
// navigation
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SaveNote from '../components/SaveNote';

type EditNoteProps = NativeStackScreenProps<RootStackParamList, 'EditNote'>;

const EditNote = ({route, navigation}: EditNoteProps) => {
  const note = route.params;
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.content);
  const [category, setCategory] = useState(note.category);
  const [open, setOpen] = useState(false);

  const {categories, setCategories} = useGlobal() as GlobalContextProps;
  const {updateNote} = useAsyncStorage();

  Moment.locale('en');
  const formattedDate = Moment(new Date()).format('DD MMM');

  const updatedNote: noteProps = {
    id: note.id,
    date: formattedDate,
    title,
    description,
    category,
  };

  useEffect(() => {
    const handleSavePress = () => {
      updateNote(updatedNote);
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

export default EditNote;
