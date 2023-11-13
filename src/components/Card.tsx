import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import globalStyles from '../styles/globalStyles';
import useGlobal from '../hooks/useGlobal';
import {
  CategoryColorsProps,
  GlobalContextProps,
} from '../contexts/GlobalContext';
import useAsyncStorage from '../hooks/useAsyncStorage';

type CardProps = {
  noteId: string;
  date: string;
  title: string;
  category: string;
  content: string;
  onPress: () => void;
};

const Card = ({
  onPress,
  noteId,
  date,
  title,
  category,
  content,
}: PropsWithChildren<CardProps>) => {
  const {categoryColors, notes} = useGlobal() as GlobalContextProps;
  const {storeNewNotes} = useAsyncStorage();

  const handleDelete = (noteID: string) => {
    const newNotes = notes?.filter(note => note.id !== noteID);
    if (newNotes) {
      storeNewNotes(newNotes);
    }
  };

  const createTwoButtonAlert = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Delete',
        onPress: () => {
          handleDelete(noteId);
        },
      },
    ]);
  };
  const handleLongPress = () => {
    createTwoButtonAlert();
  };

  return (
    <Pressable
      style={[
        styles.card,
        {backgroundColor: (categoryColors as CategoryColorsProps)[category]},
      ]}
      onLongPress={handleLongPress}
      onPress={onPress}
      delayLongPress={1000}
      android_ripple={{color: 'rgba(0,0,0,0.1)'}}>
      <View style={styles.dateContainer}>
        <Text style={[globalStyles.text, styles.date]}>{date}</Text>
      </View>
      <Text style={[globalStyles.text, styles.title]}>{title}</Text>
      <Text style={[globalStyles.text, styles.category]}>{category}</Text>
      <Text style={[globalStyles.text, styles.content]} numberOfLines={3}>
        {content}
      </Text>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    flex: 1 / 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  content: {
    color: '#404140',
    fontSize: 12,
    marginTop: 8,
  },
});
