import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';
import AddNoteBtn from '../components/AddNoteBtn';
import Card from '../components/Card';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {noteProps} from '../contexts/GlobalContext';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ItemSeparatorComponent = () => (
  <View style={styles.ItemSeparatorComponent} />
);

const Home = ({navigation}: HomeProps) => {
  const [notes, setNotes] = useState<noteProps[] | null>(null);
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
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <SearchBar />
        <View style={styles.main}>
          <View style={styles.cardContainer}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                data={notes}
                numColumns={2}
                renderItem={({item}) => (
                  <Card
                    notes={notes}
                    setNotes={setNotes}
                    noteId={item.noteId}
                    date={item.date}
                    title={item.title}
                    category={item.category}
                    content={item.description}
                  />
                )}
                ItemSeparatorComponent={ItemSeparatorComponent}
                columnWrapperStyle={styles.columnWrapperStyle}
              />
            )}
          </View>
        </View>
      </View>
      <AddNoteBtn
        onPress={() =>
          navigation.navigate('AddNote', {
            noteId: '123',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    /* padding: 10, */
    gap: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  main: {
    flex: 1,
  },
  cardContainer: {
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
  },
  columnWrapperStyle: {
    gap: 40,
  },
  ItemSeparatorComponent: {
    height: 40,
  },
});

export default Home;
