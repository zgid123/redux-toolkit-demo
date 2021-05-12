import * as React from 'react';

import { FC, useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { fetchPokemons } from 'features/pokemons/slice';
import { useRetrievePokemonLoadingState } from 'features/pokemons/selectors';

const Refetch: FC = () => {
  const dispatch = useDispatch();
  const pokemonLoadingState = useRetrievePokemonLoadingState();

  const refetch = useCallback(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <Button
      onClick={refetch}
      loadingText='Re-fetch'
      isLoading={pokemonLoadingState === 'loading'}
    >
      Re-fetch
    </Button>
  );
};

export default Refetch;
