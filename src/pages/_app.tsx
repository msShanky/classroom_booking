import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react"
import { MantineProvider } from "@mantine/core";
import { Provider } from 'react-redux'
import store from '../app/store'

export default function App(props: AppProps) {
	const { Component, pageProps: { session, ...pageProps } } = props;

	return (
		<Provider store={store}>
			<Head>
				<title>Classroom Booking</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: "light", fontFamily: "Montserrat" }}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</MantineProvider>
		</Provider>
	);
}
