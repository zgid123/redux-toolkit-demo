import { useSelector } from 'react-redux';

import { TRootState } from 'store';
import { abilitiesAdapter, IAbilityProps } from 'features/abilities/slice';

const { selectById } = abilitiesAdapter.getSelectors<TRootState>(
  (state) => state.abilities,
);

export const useRetriveAbilitiesByIds = (ids: number[]): IAbilityProps[] => {
  return useSelector<TRootState, IAbilityProps[]>((state) =>
    ids.reduce<IAbilityProps[]>((result, id) => {
      const ability = state.abilities.entities[id];

      if (ability) {
        result.push(ability);
      }

      return result;
    }, []),
  );
};

export const useRetrieveAbility = (id: number): IAbilityProps | undefined => {
  return useSelector<TRootState, IAbilityProps | undefined>((state) =>
    selectById(state, id),
  );
};
