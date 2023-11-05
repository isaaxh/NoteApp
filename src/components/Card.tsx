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

type CategoryColorsTypes = {
  [key: string]: string;
};

const categoryColors = {
  work: '#FFD460',
  personal: '#FF4D4D',
  ideas: '#4D4DFF',
  home: '#4DFF4D',
};

const Card = ({
  date,
  title,
  category,
  content,
}: PropsWithChildren<CardProps>) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: (categoryColors as CategoryColorsTypes)[category]},
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
