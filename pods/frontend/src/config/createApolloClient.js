import ApolloClient from 'apollo-boost';
const APOLLO_URL = process.env.REACT_APP_APOLLO_CLIENT;
const client = new ApolloClient({
  uri: APOLLO_URL
});

export default client;
