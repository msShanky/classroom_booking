import { useSession } from "next-auth/react";
import React, { FunctionComponent, useEffect, useState } from "react";
import { fetchUser } from "../app/slices/currentUser";
import { useAppDispatch, useAppSelector } from "../app/store";
import { CustomHeader } from "./Header";

interface Link {
	link: string;
	label: string;
	isLoggedin: boolean;
	isAdmin: boolean;
}

const linksReference = [
	{
		link: "/",
		label: "Home",
		isLoggedin: false,
		isAdmin: false
	},
	{
		link: "/orders",
		label: "Orders",
		isLoggedin: true,
		isAdmin: false
	},
	{
		link: "/addClassroom",
		label: "Upload",
		isLoggedin: true,
		isAdmin: true
	}
];

export const Layout: FunctionComponent = ({ children }) => {

	const [links, setLinks] = useState<Link[]>([])

	const { data: session } = useSession()
	const dispatch = useAppDispatch()
	const { type } = useAppSelector(state => state.currentUser)


	useEffect(() => {
		if (session) {
			dispatch(fetchUser(String(session.id)))
		}
	}, [session?.id])

	useEffect(() => {
		setLinks([...linksReference.filter(link => {
			if (link.isAdmin) {
				return type === 'Admin'
			}
			else {
				if (link.isLoggedin) {
					return !!session?.id
				}
				else return true
			}
		})])
	}, [session,type])

	return (
		<main className="container mx-auto min-h-screen">
			<CustomHeader links={links} />
			{children}
		</main>
	);
};
