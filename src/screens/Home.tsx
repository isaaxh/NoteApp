import {StyleSheet, View, Text, FlatList} from 'react-native';
import React from 'react';
import SearchBar from '../components/SearchBar';
import AddNoteBtn from '../components/AddNoteBtn';
import Card from '../components/Card';

export default function Home() {
  const data = [
    {key: 'Devin', category: 'work', content: 'content', date: '18 jul'},
    {key: 'Dan', category: 'work', content: 'content', date: '15 may'},
    {key: 'Dominic', category: 'work', content: 'content', date: '12 jan'},
    {key: 'Jackson', category: 'work', content: 'content', date: '18 jul'},
    {key: 'James', category: 'work', content: 'content', date: '15 may'},
    {key: 'Joel', category: 'work', content: 'content', date: '12 jan'},
    {key: 'John', category: 'work', content: 'content', date: '02 feb'},
    {key: 'Jillian', category: 'work', content: 'content', date: '18 jul'},
    {key: 'Jimmy', category: 'work', content: 'content', date: '05 mar'},
    {key: 'Julie', category: 'work', content: 'content', date: '10 dec'},
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
      <SearchBar />
      <AddNoteBtn />
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
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 10,
  },
  cardContainer: {
    padding: 5,
    paddingVertical: 30,
  },
  columnWrapperStyle: {
    gap: 40,
  },
  ItemSeparatorComponent: {
    height: 40,
  },
});
