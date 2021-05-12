import * as React from 'react';

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image, Stack } from '@chakra-ui/react';

import TypeIcon from 'features/types/TypeIcon';
import { useResetForm } from 'features/pokemons/hooks';
import AbilityDetail from 'features/abilities/AbilityDetail';
import Buttons from 'features/pokemons/PokemonDetail/Buttons';
import { useRetrievePokemon } from 'features/pokemons/selectors';
import PokemonMegaInfo from 'features/pokemons/PokemonDetail/PokemonMegaInfo';
import PokemonAlolaInfo from 'features/pokemons/PokemonDetail/PokemonAlolaInfo';

const PokemonDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const pokemon = useRetrievePokemon(id);
  const {
    resetForm,
    abilities,
    displayImage,
    pokemonTypes,
    setAbilities,
    setDisplayImage,
    setPokemonTypes,
  } = useResetForm(pokemon);

  if (!pokemon) {
    return null;
  }

  const { no, name, mega, alola } = pokemon;

  return (
    <Stack w='50%' mx='auto' spacing={20}>
      <Box position='relative'>
        <Buttons />
        <Heading
          p='12px'
          bottom='0'
          left='50%'
          minW='50%'
          textAlign='center'
          position='absolute'
          bgColor='#e3ebf2'
          borderTopRadius={20}
          transform='translateX(-50%)'
        >
          {name} #{no}
        </Heading>
      </Box>
      <Stack>
        <Stack isInline={true} spacing={20}>
          <Stack flex={1}>
            <Image
              mx='auto'
              maxW='200px'
              maxH='200px'
              src={displayImage}
              bgColor='#f5f5f5'
            />
            <Stack>
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
                changeAbilities={setAbilities}
                changeDisplayImage={setDisplayImage}
              />
            </Stack>
          </Stack>
          <Stack flex={1} spacing={20}>
            <Stack spacing={5}>
              <Heading>Abilities:</Heading>
              <Stack spacing={8}>
                {abilities.map((ability) => {
                  return <AbilityDetail key={ability} id={ability} />;
                })}
              </Stack>
            </Stack>
            <Stack spacing={5}>
              <Heading>Types:</Heading>
              <Stack isInline={true}>
                {pokemonTypes.map((type) => {
                  return <TypeIcon key={type} id={type} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PokemonDetail;
