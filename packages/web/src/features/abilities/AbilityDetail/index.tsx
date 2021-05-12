import * as React from 'react';

import { FC } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { useRetrieveAbility } from 'features/abilities/selectors';

interface IAbilityDetailProps {
  id: number;
}

const AbilityDetail: FC<IAbilityDetailProps> = ({ id }) => {
  const ability = useRetrieveAbility(id);

  if (!ability) {
    return null;
  }

  const { name, description } = ability;

  return (
    <Box>
      <Heading>{name}</Heading>
      <br />
      <Heading as='h4' size='md'>
        {description}
      </Heading>
    </Box>
  );
};

export default AbilityDetail;
