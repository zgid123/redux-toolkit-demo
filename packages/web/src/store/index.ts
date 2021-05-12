import {
  configureStore,
  combineReducers,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';

import moveReducer from 'features/moves/slice';
import typeReducer from 'features/types/slice';
import pokemonReducer from 'features/pokemons/slice';
import abilityReducer from 'features/abilities/slice';

let devTools: ConfigureStoreOptions['devTools'] | false = false;

if (
  (process.env.REACT_APP_CUSTOM_NODE_ENV || process.env.NODE_ENV) !==
  'production'
) {
  devTools = {
    name: 'Redux toolkit demo',
  };
}

const store = configureStore({
  devTools,
  reducer: combineReducers({
    moves: moveReducer,
    types: typeReducer,
    pokemons: pokemonReducer,
    abilities: abilityReducer,
  }),
});

export type TRootState = ReturnType<typeof store.getState>;

export default store;
