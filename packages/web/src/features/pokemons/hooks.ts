import {
  useState,
  Dispatch,
  useEffect,
  useCallback,
  SetStateAction,
} from 'react';

import { IPokemonProps } from 'features/pokemons/slice';

export const useResetForm = (
  {
    no,
    image = '',
    types = [],
    abilities: abilityList = [],
  }: IPokemonProps = {} as IPokemonProps,
): {
  abilities: number[];
  resetForm: () => void;
  displayImage?: string;
  pokemonTypes: number[];
  setAbilities: Dispatch<SetStateAction<number[]>>;
  setPokemonTypes: Dispatch<SetStateAction<number[]>>;
  setDisplayImage: Dispatch<SetStateAction<string | undefined>>;
} => {
  const [pokemonTypes, setPokemonTypes] = useState(types);
  const [abilities, setAbilities] = useState<number[]>(abilityList);
  const [displayImage, setDisplayImage] = useState<string | undefined>(image);

  const resetForm = useCallback(() => {
    setDisplayImage(image);
    setPokemonTypes(types || []);
    setAbilities(abilityList || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, JSON.stringify(types), JSON.stringify(abilities)]);

  useEffect(() => {
    setDisplayImage(image);
    setPokemonTypes(types || []);
    setAbilities(abilityList || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [no]);

  return {
    resetForm,
    abilities,
    displayImage,
    pokemonTypes,
    setAbilities,
    setPokemonTypes,
    setDisplayImage,
  };
};
