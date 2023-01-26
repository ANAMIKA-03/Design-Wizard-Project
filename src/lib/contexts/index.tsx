import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";

import { AuthProvider } from "./auth";
import { theme } from "./../../theme";
import { createApolloClient } from "./Client";
// import Example from "./Example";

export const AppProviders = (props: any) => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      {/* <Example /> */}
      <ThemeProvider theme={theme}>
        <AuthProvider>{props.children}</AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
