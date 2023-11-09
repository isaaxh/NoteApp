import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import globalStyles from '../styles/globalStyles';
import useGlobal from '../hooks/useGlobal';
import {
  CategoryColorsProps,
  GlobalContextProps,
} from '../contexts/GlobalContext';

type CardProps = {
  date: string;
  title: string;
  category: string;
  content: string;
};

const Card = ({
  date,
  title,
  category,
  content,
}: PropsWithChildren<CardProps>) => {
  const {categoryColors} = useGlobal() as GlobalContextProps;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: (categoryColors as CategoryColorsProps)[category]},
      ]}>
      <View style={styles.dateContainer}>
        <Text style={[globalStyles.text, styles.date]}>{date}</Text>
      </View>
      <Text style={[globalStyles.text, styles.title]}>{title}</Text>
      <Text style={[globalStyles.text, styles.category]}>{category}</Text>
      <Text style={[globalStyles.text, styles.content]} numberOfLines={3}>
        {content}
      </Text>
    </TouchableOpacity>
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
