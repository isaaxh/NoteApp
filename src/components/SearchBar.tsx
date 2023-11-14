import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../styles/globalStyles';
import useGlobal from '../hooks/useGlobal';
import filter from 'lodash.filter';
import {GlobalContextProps} from '../contexts/GlobalContext';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {setFilteredNotes, notes} = useGlobal() as GlobalContextProps;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(notes, note => {
      return contains(note, formattedQuery);
    });
    setFilteredNotes(filteredData);
  };

  const contains = (
    {title, category, date}: {title: string; category: string; date: string},
    query: string,
  ) => {
    if (
      title.toLowerCase().includes(query) ||
      category.includes(query) ||
      date.toLowerCase().includes(query)
    ) {
      return true;
    }
    return false;
  };
  return (
    <TextInput
      style={[styles.container, globalStyles.text]}
      placeholder="Search notes... "
      placeholderTextColor="#454545"
      value={searchQuery}
      onChangeText={query => handleSearch(query)}
      returnKeyType="search"
      clearButtonMode="while-editing"
      autoCorrect={false}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
});

export default SearchBar;
