import * as React from 'react';

import { FC } from 'react';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

import { useRetrieveAdjacentPokemons } from 'features/pokemons/selectors';

const Buttons: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prevPokemon, nextPokemon] = useRetrieveAdjacentPokemons(id);

  return (
    <Stack position='relative' isInline={true} h='150px'>
      <Button
        w='100%'
        h='150px'
        as={Link}
        pb='50px'
        colorScheme='teal'
        to={`/pokemons/${prevPokemon.no}`}
        _focus={{
          boxShadow: 'none',
        }}
      >
        <Heading>
          #{prevPokemon.no} {prevPokemon.name}
        </Heading>
      </Button>
      <Button
        w='100%'
        h='150px'
        as={Link}
        pb='50px'
        colorScheme='teal'
        to={`/pokemons/${nextPokemon.no}`}
        _focus={{
          boxShadow: 'none',
        }}
      >
        <Heading>
          #{nextPokemon.no} {nextPokemon.name}
        </Heading>
      </Button>
      <Stack
        p='10px'
        left='50%'
        isInline={true}
        borderRadius={20}
        position='absolute'
        bgColor='#e3ebf2'
        top='calc(50% + 0.5rem - 50px)'
        transform='translate(calc(-50% - 0.5rem), calc(-50% - 0.5rem + 25px))'
      >
        <Button as={Link} to='/pokemons' flex={1} colorScheme='teal'>
          Back to list
        </Button>
        <Button flex={1} colorScheme='teal'>
          Re-fetch
        </Button>
      </Stack>
    </Stack>
  );
};

export default Buttons;
