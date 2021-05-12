import * as React from 'react';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';

import TypeIcon from 'features/types/TypeIcon';
import { useResetForm } from 'features/pokemons/hooks';
import { useRetrievePokemon } from 'features/pokemons/selectors';
import PokemonMegaInfo from 'features/pokemons/PokemonDetail/PokemonMegaInfo';
import PokemonAlolaInfo from 'features/pokemons/PokemonDetail/PokemonAlolaInfo';

interface IPokemonProps {
  no: string;
}

const Pokemon: FC<IPokemonProps> = ({ no: id, ...props }) => {
  const pokemon = useRetrievePokemon(id);
  const {
    resetForm,
    displayImage,
    pokemonTypes,
    setDisplayImage,
    setPokemonTypes,
  } = useResetForm(pokemon);

  if (!pokemon) {
    return null;
  }

  const { no, name, mega, alola } = pokemon;

  return (
    <Box {...props} w='100%' bgColor='#fff'>
      <Flex
        h='140px'
        bgColor='#f5f5f5'
        alignItems='center'
        justifyContent='center'
      >
        <Link to={`/pokemons/${no}`}>
          <Image src={displayImage} />
        </Link>
      </Flex>
      <Stack
        my={5}
        p={15}
        isInline={true}
        alignItems='center'
        justifyContent='space-between'
      >
        <Text>#{no}</Text>
        <PokemonAlolaInfo
          alola={alola}
          resetForm={resetForm}
          changeTypes={setPokemonTypes}
          changeDisplayImage={setDisplayImage}
        />
        <PokemonMegaInfo
          mega={mega}
          resetForm={resetForm}
          changeTypes={setPokemonTypes}
          changeDisplayImage={setDisplayImage}
        />
      </Stack>
      <Stack spacing={5} p={15}>
        <Link to={`/pokemons/${no}`}>
          <Text fontWeight='bold' fontSize='20px'>
            {name}
          </Text>
        </Link>
        <Stack isInline={true} spacing={10}>
          {pokemonTypes.map((type) => {
            return <TypeIcon key={type} id={type} />;
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Pokemon;
