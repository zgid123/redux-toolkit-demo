import { useSelector } from 'react-redux';
import { createSelector, EntityState } from '@reduxjs/toolkit';

import { TRootState } from 'store';
import {
  IAdapterState,
  IPokemonProps,
  pokemonsAdapter,
} from 'features/pokemons/slice';

type TAdjacentPokemons = [IPokemonProps, IPokemonProps];

const { selectAll, selectById } = pokemonsAdapter.getSelectors<TRootState>(
  (state) => state.pokemons,
);

export const useRetrievePokemonLoadingState = (): IAdapterState['loading'] => {
  return useSelector<TRootState, IAdapterState['loading']>(
    (state) => state.pokemons.loading,
  );
};

export const useRetrievePokemon = (no: string): IPokemonProps | undefined => {
  return useSelector<TRootState, IPokemonProps | undefined>((state) =>
    selectById(state, no),
  );
};

export const useRetrievePokemons = (): IPokemonProps[] => {
  return useSelector<TRootState, IPokemonProps[]>((state) => selectAll(state));
};

const selectAdjacentPokemons = (id: string) => {
  return createSelector<
    TRootState,
    EntityState<IPokemonProps>,
    TAdjacentPokemons
  >([(state) => state.pokemons], (pokemons) => {
    const currentIndex = pokemons.ids.indexOf(id);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === pokemons.ids.length - 1;

    return [
      isFirst
        ? pokemons.entities[pokemons.ids[pokemons.ids.length - 1]]
        : pokemons.entities[pokemons.ids[currentIndex - 1]],
      isLast
        ? pokemons.entities[pokemons.ids[0]]
        : pokemons.entities[pokemons.ids[currentIndex + 1]],
    ] as TAdjacentPokemons;
  });
};

export const useRetrieveAdjacentPokemons = (id: string): TAdjacentPokemons => {
  return useSelector<TRootState, TAdjacentPokemons>(selectAdjacentPokemons(id));
};
