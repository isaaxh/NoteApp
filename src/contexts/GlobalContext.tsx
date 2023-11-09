import React, {createContext, useState} from 'react';
import uuid from 'react-uuid';

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export type GlobalContextProps = {
  notes: noteProps[];
  categories: category[];
  categoryColors: CategoryColorsProps;
  setNotes: React.Dispatch<React.SetStateAction<noteProps[]>>;
  setCategories: React.Dispatch<React.SetStateAction<category[]>>;
  setCategoryColors: React.Dispatch<React.SetStateAction<CategoryColorsProps>>;
};

export type noteProps = {
  noteId: string;
  date: string;
  title: string;
  description: string;
  category: string;
};

export type category = {label: string; value: string};

export type CategoryColorsProps = {
  [key: string]: string;
};

export const GlobalContext = createContext<GlobalContextProps | null>(null);

const GlobalContextProvider = ({children}: GlobalContextProviderProps) => {
  const [notes, setNotes] = useState<noteProps[]>([
    {
      noteId: uuid(),
      date: '12 Jan',
      title: 'Workout',
      description: 'Go to the gym',
      category: 'work',
    },
  ]);
  const [categories, setCategories] = useState<category[]>([
    {label: 'Work', value: 'work'},
    {label: 'Personal', value: 'personal'},
    {label: 'Ideas', value: 'ideas'},
    {label: 'Home', value: 'home'},
  ]);
  const [categoryColors, setCategoryColors] = useState<CategoryColorsProps>({
    work: '#FFD460',
    personal: '#FF4D4D',
    ideas: '#4D4DFF',
    home: '#4DFF4D',
  });

  const value: GlobalContextProps = {
    notes,
    setNotes,
    categories,
    setCategories,
    categoryColors,
    setCategoryColors,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
