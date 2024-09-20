/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // eslint-disable-next-line array-callback-return
    graphQLErrors.map(({ message, locations, path }) => {
      // eslint-disable-next-line no-console
      console.log(`Graphql error ${message}`);
    });
  }
  // eslint-disable-next-line no-useless-return
  return;
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
