import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react"
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from "@mantine/core";
import { Provider } from 'react-redux'
import store from '../app/store'
import { Layout } from "../components/Layout";

export default function App(props: AppProps) {
	const { Component, pageProps: { session, ...pageProps } } = props;
	const AnyComponent = Component as any;

	return (
		<Provider store={store}>
			<Head>
				<title>Classroom Booking</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: "light", fontFamily: "Montserrat" }}>
				<NotificationsProvider position="top-center" zIndex={2077}>
					<SessionProvider session={session}>
						<Layout>
							<AnyComponent {...pageProps} />
						</Layout>
					</SessionProvider>
				</NotificationsProvider>
			</MantineProvider>
		</Provider>
	);
}
