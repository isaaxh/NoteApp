import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import SearchBar from '../components/SearchBar';
import AddNoteBtn from '../components/AddNoteBtn';
import Card from '../components/Card';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Header from '../components/Header';
import useAsyncStorage from '../hooks/useAsyncStorage';

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ItemSeparatorComponent = () => (
  <View style={styles.ItemSeparatorComponent} />
);

const Home = ({navigation}: HomeProps) => {
  const {notes, loading, getData} = useAsyncStorage();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    /* getData(); */
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <SearchBar />
        <View style={styles.main}>
          <View
            style={styles.cardContainer}
            /* refreshControl={ */
            /*   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> */
            /* } */
          >
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                data={notes}
                numColumns={2}
                renderItem={({item}) => (
                  <Card
                    onPress={() => {
                      navigation.push('EditNote', {
                        id: item.id,
                        date: item.date,
                        title: item.title,
                        category: item.category,
                        content: item.description,
                      });
                    }}
                    noteId={item.id}
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
      <AddNoteBtn onPress={() => navigation.push('AddNote')} />
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
