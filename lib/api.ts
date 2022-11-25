import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
// import apiToken from "../token";
const apiToken = 'test'
const headers = {
  authorization: `Bearer ${apiToken}`,
};

const httpLink = new HttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
  headers,
});

const wsLink = new WebSocketLink({
  uri: "wss://chat.thewidlarzgroup.com/socket",
  options: { reconnect: true, connectionParams: { authToken: apiToken } },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const widlarzClient = new ApolloClient({
  link: splitLink,
  // uri: "https://chat.thewidlarzgroup.com/api/graphql",
  cache: new InMemoryCache(),
  headers,
});

export default widlarzClient;

export const userFrag = `
user {
	id
	firstName
	email
	lastName
	role
}`;
