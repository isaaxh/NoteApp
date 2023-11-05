import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import globalStyles from '../styles/globalStyles';

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
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={globalStyles.text}>{date}</Text>
      </View>
      <Text style={[styles.title, globalStyles.text]}>{title}</Text>
      <Text style={[styles.category, globalStyles.text]}>{category}</Text>
      <Text style={[styles.content, globalStyles.text]}>{content}</Text>
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

    // shadow
    /* elevation: 1, */
    /* shadowColor: '#000', */
    /* shadowOffset: {width: 0, height: 1}, */
    /* shadowOpacity: 0.8, */
    /* shadowRadius: 1, */
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
  },
  content: {
    fontSize: 12,
  },
});
