import { IEndpointConfigProps } from '@interfaces/router';
import importEndpoints from '@utils/router/importEndpoints';

const endpointConfig: IEndpointConfigProps = {
  getPokemons: { httpMethod: 'get', path: '/' },
};

export default importEndpoints({
  endpointConfig,
  path: __dirname,
});
