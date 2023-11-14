import React, {createContext, useState} from 'react';

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export type GlobalContextProps = {
  notes: noteProps[] | null;
  setNotes: React.Dispatch<React.SetStateAction<noteProps[] | null>>;
  filteredNotes: noteProps[] | null;
  setFilteredNotes: React.Dispatch<React.SetStateAction<noteProps[] | null>>;
  categories: category[];
  setCategories: React.Dispatch<React.SetStateAction<category[]>>;
  categoryColors: CategoryColorsProps;
  setCategoryColors: React.Dispatch<React.SetStateAction<CategoryColorsProps>>;
};

export type noteProps = {
  id: string;
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
  const [notes, setNotes] = useState<noteProps[] | null>(null);
  const [filteredNotes, setFilteredNotes] = useState<noteProps[] | null>(null);
  const [categories, setCategories] = useState<category[]>([
    {label: 'Work', value: 'work'},
    {label: 'Personal', value: 'personal'},
    {label: 'Ideas', value: 'ideas'},
    {label: 'Home', value: 'home'},
  ]);
  const [categoryColors, setCategoryColors] = useState<CategoryColorsProps>({
    work: '#FFD460',
    personal: '#90d2d8',
    ideas: '#e0a899',
    home: '#dabcff',
  });

  const value: GlobalContextProps = {
    notes,
    setNotes,
    filteredNotes,
    setFilteredNotes,
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
