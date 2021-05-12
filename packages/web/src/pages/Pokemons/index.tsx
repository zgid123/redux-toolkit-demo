import * as React from 'react';

import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Preloader from 'components/Preloader';
import PokemonList from 'features/pokemons/PokemonList';
import { fetchPokemons } from 'features/pokemons/slice';
import PokemonDetail from 'features/pokemons/PokemonDetail';
import { useRetrievePokemonLoadingState } from 'features/pokemons/selectors';

const Pokemons: FC<RouteComponentProps> = ({ match: { path } }) => {
  const dispatch = useDispatch();
  const pokemonLoadingState = useRetrievePokemonLoadingState();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (pokemonLoadingState === 'idle') {
    return <Preloader />;
  }

  return (
    <Switch>
      <Route exact path={`${path}`} component={PokemonList} />
      <Route path={`${path}/:id`} component={PokemonDetail} />
    </Switch>
  );
};

export default Pokemons;
