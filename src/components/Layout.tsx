import React, { FunctionComponent } from "react";
import { CustomHeader } from "./Header";
import styles from "../styles/Home.module.css";
import { createStyles } from "@mantine/core";

const links = [
	{
		link: "/",
		label: "Home",
	},
	{
		link: "/orders",
		label: "Orders",
	},
];

const useStyles = createStyles(() => ({
	container: {
		padding: "0 2em",
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
	},
}));

export const Layout: FunctionComponent = ({ children }) => {
	const { classes } = useStyles();
	return (
		// <div className={classes.container}>
		<main className="container mx-auto min-h-screen">
			<CustomHeader links={links} />
			{children}
		</main>
	);
};
