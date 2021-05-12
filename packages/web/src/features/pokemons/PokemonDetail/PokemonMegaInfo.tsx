import * as React from 'react';

import { isEmpty } from 'ramda';
import { Image, Stack, Tooltip } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

import megaIconY from 'assets/images/mega-y.png';
import megaIconX from 'assets/images/mega-x.png';
import megaForm from 'assets/images/mega-form.png';
import { IPokemonProps } from 'features/pokemons/slice';

interface IPokemonMegaInfoProps {
  resetForm: () => void;
  mega?: IPokemonProps['mega'];
  changeTypes: Dispatch<SetStateAction<number[]>>;
  changeAbilities?: Dispatch<SetStateAction<number[]>>;
  changeDisplayImage: Dispatch<SetStateAction<string | undefined>>;
}

type TForm = 'normal' | 'mega' | 'megaX' | 'megaY';

const PokemonMegaInfo: FC<IPokemonMegaInfoProps> = ({
  mega = {},
  resetForm,
  changeTypes,
  changeAbilities,
  changeDisplayImage,
  ...props
}) => {
  const { x, y, ...megaProps } = mega;
  const isMegaPropsEmpty = isEmpty(megaProps);
  const [form, setForm] = useState<TForm>('normal');

  const handleClick = useCallback(
    (nextForm: TForm, image: string, types: number[], abilities: number[]) => {
      return () => {
        if (nextForm === form) {
          resetForm();
          setForm('normal');
        } else {
          setForm(nextForm);
          changeTypes(types);
          changeDisplayImage(image);
          changeAbilities?.(abilities);
        }
      };
    },
    [changeAbilities, changeDisplayImage, changeTypes, form, resetForm],
  );

  if (isMegaPropsEmpty && !x && !y) {
    return null;
  }

  return (
    <Stack {...props} isInline={true} spacing={5}>
      {!isMegaPropsEmpty && (
        <Tooltip label='Mega Evolution' aria-label='Mega Evolution'>
          <Image
            w='20px'
            minH='27px'
            src={form === 'mega' ? megaForm : megaIconX}
            onClick={handleClick(
              'mega',
              megaProps.image as string,
              megaProps.types as number[],
              megaProps.abilities as number[],
            )}
          />
        </Tooltip>
      )}
      {x && (
        <Tooltip label='Mega X Evolution' aria-label='Mega X Evolution'>
          <Image
            w='20px'
            minH='27px'
            src={form === 'megaX' ? megaForm : megaIconX}
            onClick={handleClick('megaX', x.image, x.types, x.abilities)}
          />
        </Tooltip>
      )}
      {y && (
        <Tooltip label='Mega Y Evolution' aria-label='Mega Y Evolution'>
          <Image
            w='20px'
            minH='27px'
            src={form === 'megaY' ? megaForm : megaIconY}
            onClick={handleClick('megaY', y.image, y.types, y.abilities)}
          />
        </Tooltip>
      )}
    </Stack>
  );
};

export default PokemonMegaInfo;
