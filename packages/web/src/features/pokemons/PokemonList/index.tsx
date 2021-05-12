import * as React from 'react';

import { FC } from 'react';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';

import Pokemon from 'features/pokemons/PokemonList/Pokemon';
import Refetch from 'features/pokemons/PokemonList/Refetch';
import { useRetrievePokemons } from 'features/pokemons/selectors';

const PokemonList: FC = () => {
  const pokemons = useRetrievePokemons();

  return (
    <Box>
      <Flex mb={10} p={15} bgColor='white' justifyContent='space-between'>
        <Heading>List Pokemons</Heading>
        <Refetch />
      </Flex>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {pokemons.map(({ no }) => {
          return <Pokemon key={no} no={no} />;
        })}
      </Grid>
    </Box>
  );
};

export default PokemonList;
