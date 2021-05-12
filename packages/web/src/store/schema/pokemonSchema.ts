import { schema } from 'normalizr';

import typeSchema from './typeSchema';
import moveSchema from './moveSchema';
import abilitySchema from './abilitySchema';

export default new schema.Entity(
  'pokemons',
  {
    types: [typeSchema],
    moves: [moveSchema],
    abilities: [abilitySchema],
    mega: {
      x: {
        types: [typeSchema],
        abilities: [abilitySchema],
      },
      y: {
        types: [typeSchema],
        abilities: [abilitySchema],
      },
      types: [typeSchema],
      abilities: [abilitySchema],
    },
    alola: {
      types: [typeSchema],
      abilities: [abilitySchema],
    },
  },
  {
    // idAttribute: 'no',
  },
);
