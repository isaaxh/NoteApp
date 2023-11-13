import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../styles/globalStyles';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function Header() {
  const {sortNotes} = useAsyncStorage();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSortPress = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    sortNotes(sortOrder);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImg}>
        <Image
          style={styles.image}
          source={require('../assets/punjabi-man.jpg')}
        />
      </TouchableOpacity>
      <Text style={[styles.label, globalStyles.text]}>Note App</Text>
      <TouchableOpacity style={styles.button} onPress={handleSortPress}>
        <Icon name="sort-amount-desc" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    color: '#000000',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 40,
    height: 40,
  },
  button: {
    justifyContent: 'center',
    padding: 4,
  },
});
