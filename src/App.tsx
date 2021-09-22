import React from "react";
import { Container } from "./App.styles";
import { UserProvider } from "./contexts/UserContext";
import { ChannelProvider } from "./contexts/ChannelContext";
import GlobalStyle from "./styles/global.styles";
import {
	ApolloClient,
	InMemoryCache,
    HttpLink,
    from,
    ApolloProvider
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ErrorProvider } from "./contexts/ErrorContext";
import Navbar from "./components/Navbar.tsx";
import ChatBoard from "./components/ChatBoard.tsx";
import { TextProvider } from "./contexts/TextContext";
import { SentProvider } from "./contexts/SentContext";

const httpLink = new HttpLink({
	uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
	credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

	if (networkError) {
		console.log(`[Network error]: ${networkError}`);

		if (typeof window !== 'undefined' && !window.navigator.onLine) {
			alert('Sorry, your browser is offline.');
		  } else {
			alert('Some other network error occurred.');
		  }	
	}
});

const client = new ApolloClient({
	link: from([errorLink, httpLink]),
    cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<UserProvider>
        <ChannelProvider>
							<SentProvider>
          <TextProvider>
						<ErrorProvider>
            			<GlobalStyle />
							<Container>
								<Navbar />
								<ChatBoard />	
							</Container>
					</ErrorProvider>
          </TextProvider>
							</SentProvider>
				</ChannelProvider>
			</UserProvider>
		</ApolloProvider>
	);
}

export default App;
