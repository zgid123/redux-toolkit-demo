import { Request, Response } from 'express';

import pokemons from '@fixtures/pokemons';
import { RTAction } from '@interfaces/controller';

const getPokemons = (_req: Request, res: Response): RTAction => {
  return global.ApiResponse.respond({
    data: pokemons.sort((a, b) => {
      if (a.no < b.no) {
        return -1;
      }

      if (a.no === b.no) {
        return 0;
      }

      return 1;
    }),
  })(res);
};

export default getPokemons;
