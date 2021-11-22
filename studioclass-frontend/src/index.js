import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('masterclass-user-token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : null
    }
  }
});

// ws://localhost:4000/graphql/subscriptions
// wss://studioclass.herokuapp.com/graphql/subscriptions
const uploadLink = createUploadLink({ uri: '/graphql/'});
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql/subscriptions`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(uploadLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
