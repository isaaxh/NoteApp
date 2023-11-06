import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBar';
import AddNoteBtn from '../components/AddNoteBtn';
import Card from '../components/Card';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Header from '../components/Header';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: HomeProps) => {
  const data = [
    {
      key: 'Devin',
      category: 'work',
      content:
        'this is  some text to check the truncateion of the text in react native app',
      date: '18 jul',
    },
    {key: 'Dan', category: 'work', content: 'content', date: '15 may'},
    {key: 'Dominic', category: 'personal', content: 'content', date: '12 jan'},
    {key: 'Jackson', category: 'work', content: 'content', date: '18 jul'},
    {key: 'James', category: 'work', content: 'content', date: '15 may'},
    {key: 'Joel', category: 'ideas', content: 'content', date: '12 jan'},
    {key: 'John', category: 'work', content: 'content', date: '02 feb'},
    {key: 'Jillian', category: 'work', content: 'content', date: '18 jul'},
    {key: 'Jimmy', category: 'work', content: 'content', date: '05 mar'},
    {key: 'Julie', category: 'personal', content: 'content', date: '10 dec'},
    {key: 'Tom', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Chris', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Hamid', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Hammond', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Khalid', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Howard', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Harry', category: 'work', content: 'content', date: '10 dec'},
    {key: 'Larry', category: 'work', content: 'content', date: '10 dec'},
  ];
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <SearchBar />
        <View style={styles.main}>
          <View style={styles.cardContainer}>
            <FlatList
              data={data}
              numColumns={2}
              renderItem={({item}) => (
                <Card
                  date={item.date}
                  title={item.key}
                  category={item.category}
                  content={item.content}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={styles.ItemSeparatorComponent} />
              )}
              columnWrapperStyle={styles.columnWrapperStyle}
            />
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
