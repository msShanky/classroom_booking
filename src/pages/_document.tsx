import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com"></link>
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;900&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
