import { schema } from 'normalizr';

import typeSchema from './typeSchema';

export default new schema.Entity('moves', {
  type: typeSchema,
});
