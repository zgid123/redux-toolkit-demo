import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchPokemons } from 'features/pokemons/slice';

interface IMoveProps {
  id: number;
  name: string;
  power?: number;
  accuracy?: number;
  powerPoint: number;
  category: 'physical' | 'special' | 'other';
}

interface IAdapterState {
  loading: 'idle' | 'loading' | 'loaded';
}

export const movesAdapter = createEntityAdapter<IMoveProps>();

const moveSlice = createSlice({
  name: 'moves',
  initialState: movesAdapter.getInitialState<IAdapterState>({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      movesAdapter.upsertMany(state, payload.moves as IMoveProps[]);
    });
  },
});

const moveReducer = moveSlice.reducer;

export type TMoveState = ReturnType<typeof moveReducer>;

export default moveReducer;
