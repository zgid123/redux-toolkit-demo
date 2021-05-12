import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchPokemons } from 'features/pokemons/slice';

export interface IAbilityProps {
  id: number;
  name: string;
  description: string;
}

interface IAdapterState {
  loading: 'idle' | 'loading' | 'loaded';
}

export const abilitiesAdapter = createEntityAdapter<IAbilityProps>();

const abilitySlice = createSlice({
  name: 'abilities',
  initialState: abilitiesAdapter.getInitialState<IAdapterState>({
    loading: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      abilitiesAdapter.upsertMany(state, payload.abilities as IAbilityProps[]);
    });
  },
});

const abilityReducer = abilitySlice.reducer;

export type TAbilityState = ReturnType<typeof abilityReducer>;

export default abilityReducer;
