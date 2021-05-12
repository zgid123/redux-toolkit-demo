import * as React from 'react';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import store from 'store';
import Pokemons from 'pages/Pokemons';

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box p={20}>
          <Switch>
            <Route path={'/pokemons'} component={Pokemons} />
            <Redirect to={'/pokemons'} />
          </Switch>
        </Box>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
