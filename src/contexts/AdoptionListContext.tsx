import React, { createContext, useState, useContext } from 'react';
import { Animal } from '../pages/Animals/models/animalModel';


interface AdoptionListContextProps {
  adoptions: Animal[];
  addToList: (animal: Animal) => void;
  removeFromList: (animalId: string) => void;
  clearList: () => void;
}

const AdoptionListContext = createContext<AdoptionListContextProps | undefined>(undefined);

export const AdoptionListProvider: React.FC<any> = ({ children }) => {
  const [list, setList] = useState<Animal[]>([]);

  const addToList = (animal: Animal): boolean => {
    if(list.some(a => a.Id === animal.Id)) {
      return true;
    }
    setList([...list, animal]);
    return false
  };

  const removeFromList = (animalId: string) => {
    setList(list.filter(animal => animal.Id !== animalId));
  };

  const clearList = () => {
    setList([]);
  };

  return (
    <AdoptionListContext.Provider value={{ adoptions: list, addToList, removeFromList, clearList }}>
      {children}
    </AdoptionListContext.Provider>
  );
};

export const useAdoptionList = () => {
  const context = useContext(AdoptionListContext);
  if (!context) {
    throw new Error('useAdoptionList must be used within an AdoptionListProvider');
  }
  return context;
};