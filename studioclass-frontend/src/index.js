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

const wsUri = process.env.REACT_APP_WS_URI;

const uploadLink = createUploadLink({ uri: '/graphql/'});
const wsLink = new WebSocketLink({
  uri: wsUri,
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

// For preventing duplicate edges from getting added to cache
const includesCursor = (existing, incoming) => {
  const existingCursors = existing.map(e => e.cursor);

  return existingCursors.includes(incoming.cursor);
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {

          // Don't cache separate results if queries 
          // use the same ordering arguments.
          keyArgs: ["orderBy", "orderDirection"],

          merge(existing, incoming) {
            if (!existing) return incoming;
            if (!incoming) return existing;
            console.log('existing', existing);
            console.log('incoming', incoming);
            // If subscription data has been published, return
            // incoming data, as it has already merged the data
            // (with the new post at the top)
            if(incoming.__typename === 'Subscription') return incoming;
            
            const newPosts = [...existing.edges, ...incoming.edges.filter(
              i => !(includesCursor(existing.edges, i))
            )];
            
            // Ensure that correct pageInfo and totalCount are used
            // in case original query is queried again
            const pageInfo = incoming.totalCount > existing.totalCount
              ? incoming.pageInfo
              : existing.pageInfo;

            const totalCount = incoming.totalCount > existing.totalCount
              ? incoming.totalCount
              : existing.totalCount;

            return {
              ...incoming,
              totalCount: totalCount,
              edges: newPosts,
              pageInfo: pageInfo
            }
          }
        }
      }
    },
  }
});

const client = new ApolloClient({
  cache,
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
