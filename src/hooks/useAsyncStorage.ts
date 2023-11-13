import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {GlobalContextProps, noteProps} from '../contexts/GlobalContext';
import useGlobal from './useGlobal';

type order = 'asc' | 'desc';

const useAsyncStorage = () => {
  const {notes, setNotes} = useGlobal() as GlobalContextProps;
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('notes');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);
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

  const updateNote = useCallback(async (updatedNote: noteProps) => {
    try {
      const oldNotes = await AsyncStorage.getItem('notes');
      if (oldNotes !== null) {
        const newNotes = JSON.parse(oldNotes);
        const noteIndex = newNotes.findIndex(
          (note: noteProps) => note.id === updatedNote.id,
        );
        newNotes[noteIndex] = updatedNote;
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const sortNotes = async (order: order) => {
    const notesToSort = await getData();
    if (notesToSort === null) {
      return;
    }
    notesToSort.sort((a: noteProps, b: noteProps) => {
      const keyA = a.title.toLowerCase();
      const keyB = b.title.toLowerCase();
      if (order === 'desc') {
        if (keyA > keyB) {
          return -1;
        }
        if (keyA < keyB) {
          return 1;
        }
      } else {
        if (keyA > keyB) {
          return 1;
        }
        if (keyA < keyB) {
          return -1;
        }
      }
      return 0;
    });
    await storeNewNotes(notesToSort);
  };

  return {
    notes,
    setNotes,
    loading,
    getData,
    storeNewNote,
    storeNewNotes,
    updateNote,
    sortNotes,
  };
};

export default useAsyncStorage;
