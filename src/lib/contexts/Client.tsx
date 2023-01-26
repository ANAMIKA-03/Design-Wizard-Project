import { ApolloClient, concat, HttpLink, InMemoryCache } from "@apollo/client";
import {
  AUTH_TYPE,
  createAuthLink as awsCreateAuthLink,
} from "aws-appsync-auth-link";

const url = process.env.REACT_APP_API_URL || "";
// "https://nos7itzajrdltgxym7yo6dbmse.appsync-api.eu-west-1.amazonaws.com/graphql";
//"https://koxbt7w7z5dexjpq7pfnrnfv4m.appsync-api.eu-west-1.amazonaws.com/graphql";
const api_key = process.env.REACT_APP_API_KEY || "";
// "da2-xhsmsnxtwveexdz2dgf2ztnav4";
const region = "eu-west-1";

const createAuthLink = () => {
  return awsCreateAuthLink({
    auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: api_key,
    },
    region,
    url,
  });
};

export const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(createAuthLink(), new HttpLink({ uri: url })),
  });
