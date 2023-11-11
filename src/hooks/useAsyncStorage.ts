import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {GlobalContextProps, noteProps} from '../contexts/GlobalContext';
import useGlobal from './useGlobal';

const useAsyncStorage = () => {
  const {notes, setNotes} = useGlobal() as GlobalContextProps;
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('notes');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };
      setTimeout(() => {
        if (isActive) {
          getData().then(setNotes);
          setLoading(false);
        }
      }, 1500);

      return () => (isActive = false);
    }, [setNotes]),
  );

  const storeNewNotes = async (newNotes: noteProps[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (e) {
      console.log(e);
    }
  };

  const storeNewNote = useCallback(async (note: noteProps) => {
    try {
      const oldNotes = await AsyncStorage.getItem('notes');
      if (oldNotes !== null) {
        const newNotes = JSON.parse(oldNotes);
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
  }, []);

  return {notes, setNotes, loading, storeNewNote, storeNewNotes};
};

export default useAsyncStorage;
