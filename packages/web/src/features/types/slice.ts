import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchPokemons } from 'features/pokemons/slice';

export interface ITypeProps {
  id: number;
  name: string;
}

interface IAdapterState {
  loading: 'idle' | 'loading' | 'loaded';
}

export const typesAdapter = createEntityAdapter<ITypeProps>();

const typeSlice = createSlice({
  name: 'types',
  initialState: typesAdapter.getInitialState<IAdapterState>({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      typesAdapter.upsertMany(state, payload.types as ITypeProps[]);
    });
  },
});

const typeReducer = typeSlice.reducer;

export type TTypeState = ReturnType<typeof typeReducer>;

export default typeReducer;
