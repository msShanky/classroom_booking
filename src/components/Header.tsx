import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { createStyles, Header, Container, Group, Burger, Title, Button, Avatar } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Link from 'next/link'
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "100%",
	},

	links: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("xs")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: "8px 12px",
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
					: theme.colors[theme.primaryColor][0],
			color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
		},
	},
}));

interface HeaderSimpleProps {
	links: { link: string; label: string }[];
}

export function CustomHeader({ links }: HeaderSimpleProps) {
	const [opened, toggleOpened] = useBooleanToggle(false);
	const { pathname } = useRouter()
	const [active, setActive] = useState(pathname);
	const { classes, cx } = useStyles();
	const { data: session } = useSession()

	const items = links.map((link) => (
		<Link
			href={link.link}
			key={link.label}
		>
			<a
				className={cx(classes.link, { [classes.linkActive]: active === link.link })}
				onClick={() => { setActive(link.link); }}
			>
				{link.label}
			</a>
		</Link>
	));

	useEffect(() => {
		setActive(pathname);
	})

	return (
		<Header classNames={{ root: "border-none" }} height={60} mb={20}>
			<Container className="container flex flex-row justify-between">
				<Link href={'/'}>
					<Title className="font-bold font-sans text-primary-600 select-none hover:cursor-pointer hover:text-secondary-500">
						ClassB_<span className="text-6xl">.</span>
					</Title>
				</Link>
				<Group spacing={5} className={classes.links}>
					{items}
					{!session
						? <Button radius="md" variant="light" onClick={() => signIn()}>Login</Button>
						: (<>
							<Button color="red" variant="light" radius="md" onClick={() => signOut()}>Logout</Button>
							<Link href={'/profile'}							>
								<Avatar src={session?.user?.image} color="cyan" radius="xl">{session?.user?.name && session?.user?.name[0]}</Avatar>
							</Link>
						</>)}
				</Group>
				<Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
			</Container>
		</Header >
	);
}
