import { TRootState } from 'store';
import { movesAdapter } from 'features/moves/slice';

export const {
  selectIds: selectMoveIds,
  selectAll: selectAllMoves,
  selectById: selectMoveById,
  selectTotal: selectTotalMoves,
  selectEntities: selectMoveEntities,
} = movesAdapter.getSelectors<TRootState>((state) => state.moves);
