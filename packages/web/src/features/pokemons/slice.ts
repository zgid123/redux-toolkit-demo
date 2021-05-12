import { normalize } from 'normalizr';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import api from 'utils/api';
import pokemonSchema from 'store/schema/pokemonSchema';

interface IPokemonFormProps {
  image: string;
  types: number[];
  abilities: number[];
}

type TMega = Partial<IPokemonFormProps> & {
  x?: IPokemonFormProps;
  y?: IPokemonFormProps;
};

export interface IPokemonProps {
  no: string;
  name: string;
  mega?: TMega;
  image: string;
  types: number[];
  abilities: number[];
  alola?: IPokemonFormProps;
}

export interface IAdapterState {
  loading: 'idle' | 'loading' | 'loaded';
}

export const pokemonsAdapter = createEntityAdapter<IPokemonProps>({
  selectId: (pokemon) => pokemon.no,
  sortComparer: false,
});

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (_, { signal }) => {
    const source = api.CancelToken.source();

    signal.addEventListener('abort', () => {
      source.cancel();
    });

    const { data } = await api.get<{ data: IPokemonProps[] }>({
      endpoint: '/pokemons',
      cancelToken: source.token,
    });

    const normalizedData = normalize(
      { pokemons: data },
      { pokemons: [pokemonSchema] },
    );

    return normalizedData.entities;
  },
);

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsAdapter.getInitialState<IAdapterState>({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      if (state.loading === 'loaded') {
        state.loading = 'loading';
      }
    });

    builder.addCase(fetchPokemons.rejected, (state) => {
      state.loading = 'loaded';
    });

    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.loading = 'loaded';

      pokemonsAdapter.upsertMany(state, payload.pokemons as IPokemonProps[]);
    });
  },
});

const pokemonReducer = pokemonSlice.reducer;

export type TPokemonState = ReturnType<typeof pokemonReducer>;

export default pokemonReducer;
