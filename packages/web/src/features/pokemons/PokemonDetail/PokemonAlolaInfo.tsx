import * as React from 'react';

import { Image, Tooltip } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

import alolaIcon from 'assets/images/alola.png';
import alolaForm from 'assets/images/alola-form.png';
import { IPokemonProps } from 'features/pokemons/slice';

interface IPokemonAlolaInfoProps {
  resetForm: () => void;
  alola?: IPokemonProps['alola'];
  changeTypes: Dispatch<SetStateAction<number[]>>;
  changeAbilities?: Dispatch<SetStateAction<number[]>>;
  changeDisplayImage: Dispatch<SetStateAction<string | undefined>>;
}

type TForm = 'normal' | 'alola';

const PokemonAlolaInfo: FC<IPokemonAlolaInfoProps> = ({
  alola,
  resetForm,
  changeTypes,
  changeAbilities,
  changeDisplayImage,
  ...props
}) => {
  const [form, setForm] = useState<TForm>('normal');

  const handleClick = useCallback(() => {
    if (form === 'alola') {
      resetForm();
      setForm('normal');
    } else {
      setForm('alola');
      changeTypes(alola?.types || []);
      changeDisplayImage(alola?.image);
      changeAbilities?.(alola?.abilities || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form,
    resetForm,
    changeTypes,
    alola?.image,
    changeDisplayImage,
    JSON.stringify(alola?.types), // eslint-disable-line react-hooks/exhaustive-deps
  ]);

  if (!alola) {
    return null;
  }

  return (
    <Tooltip {...props} label='Alola Form' aria-label='Alola Form'>
      <Image
        w='20px'
        onClick={handleClick}
        src={form === 'alola' ? alolaForm : alolaIcon}
      />
    </Tooltip>
  );
};

export default PokemonAlolaInfo;
