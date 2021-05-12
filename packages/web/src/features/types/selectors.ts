import { useSelector } from 'react-redux';

import { TRootState } from 'store';
import { ITypeProps, typesAdapter } from 'features/types/slice';

const { selectById } = typesAdapter.getSelectors<TRootState>(
  (state) => state.types,
);

export const useRetriveTypesByIds = (ids: number[]): ITypeProps[] => {
  return useSelector<TRootState, ITypeProps[]>((state) =>
    ids.reduce<ITypeProps[]>((result, id) => {
      const type = state.types.entities[id];

      if (type) {
        result.push(type);
      }

      return result;
    }, []),
  );
};

export const useRetrieveType = (id: number): ITypeProps | undefined => {
  return useSelector<TRootState, ITypeProps | undefined>((state) =>
    selectById(state, id),
  );
};
