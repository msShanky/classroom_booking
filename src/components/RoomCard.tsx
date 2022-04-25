// import React, { FunctionComponent } from "react";
// import { Card, Image, Text, Group, Badge, createStyles, Center, Button, Divider } from "@mantine/core";
// import { Dimensions, Users } from "tabler-icons-react";
// import { Room } from "../data/mock_rooms";

// const useStyles = createStyles((theme) => ({
// 	card: {
// 		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
// 		width: "80%",
// 		display: "flex",
// 		flexDirection: "row",
// 		height: "320px",
// 		justifyContent: "space-between",
// 	},

// 	imageSection: {
// 		padding: theme.spacing.md,
// 		display: "flex",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		width: "45%",
// 		// borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
// 	},
// 	contentSection: {
// 		width: "55%",
// 	},

// 	label: {
// 		marginBottom: theme.spacing.xs,
// 		lineHeight: 1,
// 		fontWeight: 700,
// 		fontSize: theme.fontSizes.xs,
// 		letterSpacing: -0.25,
// 		textTransform: "uppercase",
// 	},

// 	section: {
// 		padding: theme.spacing.md,
// 		borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
// 	},

// 	icon: {
// 		marginRight: 5,
// 		color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5],
// 	},
// }));

// type RoomCardProps = {
// 	room: Room;
// 	handleRoomBooking: () => void;
// };

// export const RoomCard: FunctionComponent<RoomCardProps> = ({ room, handleRoomBooking }) => {
// 	const { classes } = useStyles();
// 	const { name, description, tags, pricePerHour, capacity, isActive } = room;

// 	const mockdata = [
// 		{ label: `${capacity} students`, icon: Users },
// 		{ label: "1000 * 800", icon: Dimensions },
// 	];
// 	const features = mockdata.map((feature) => (
// 		<Center key={feature.label}>
// 			<feature.icon size={18} className={classes.icon} />
// 			<Text size="xs">{feature.label}</Text>
// 		</Center>
// 	));

// 	return (
// 		<Card radius="md" className={classes.card}>
// 			<Card.Section className={classes.imageSection}>
// 				<Image fit="contain" src="https://picsum.photos/200.webp" alt="Tesla Model S" />
// 			</Card.Section>
// 			<Card.Section className={classes.contentSection}>
// 				<Group position="apart" mt="md">
// 					<div>
// 						<Text weight={500}>{name}</Text>
// 						<Text size="xs" color="dimmed">
// 							{description}
// 						</Text>
// 					</div>
// 					{tags &&
// 						tags.map((tag, index) => {
// 							const uniqueId = (index + 23) * 157965487;
// 							return (
// 								<Badge key={`CARD_BADGE${uniqueId}_${tag}`} variant="gradient">
// 									{tag}
// 								</Badge>
// 							);
// 						})}
// 				</Group>
// 				<Card.Section className={classes.section} mt="md">
// 					<Text size="sm" color="dimmed" className={classes.label}>
// 						Features
// 					</Text>
// 					<Group spacing={8} mb={-8}>
// 						{features}
// 					</Group>
// 				</Card.Section>

// 				<Card.Section className={classes.section}>
// 					<Group spacing={30}>
// 						<div>
// 							<Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
// 								{`$${pricePerHour}`}
// 							</Text>
// 							<Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
// 								per hour
// 							</Text>
// 						</div>
// 						<Button onClick={handleRoomBooking} disabled={!isActive} radius="xl">
// 							Book now
// 						</Button>
// 					</Group>
// 				</Card.Section>
// 			</Card.Section>
// 		</Card>
// 	);
// };

import React from "react";
import { createStyles, Card, Image, ActionIcon, Group, Text, Avatar, Badge } from "@mantine/core";
import { Heart, Bookmark, Share } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	footer: {
		padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
		marginTop: theme.spacing.md,
		borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
	},
}));

interface ArticleCardFooterProps {
	image: string;
	category: string;
	title: string;
	footer: string;
	author: {
		name: string;
		description: string;
		image: string;
	};
}

export function RoomCard({ image, category, title, footer, author }: ArticleCardFooterProps) {
	const { classes, theme } = useStyles();

	return (
		<Card withBorder p="lg" radius="md" className={classes.card}>
			<Card.Section mb="sm">
				<Image src={image} alt={title} height={180} />
			</Card.Section>

			<Badge>{category}</Badge>

			<Text weight={700} className={classes.title} mt="xs">
				{title}
			</Text>

			<Group mt="lg">
				<Avatar src={author.image} radius="sm" />
				<div>
					<Text weight={500}>{author.name}</Text>
					<Text size="xs" color="dimmed">
						{author.description}
					</Text>
				</div>
			</Group>

			<Card.Section className={classes.footer}>
				<Group position="apart">
					<Text size="xs" color="dimmed">
						{footer}
					</Text>
					<Group spacing={0}>
						<ActionIcon>
							<Heart size={18} color={theme.colors.red[6]} />
						</ActionIcon>
						<ActionIcon>
							<Bookmark size={18} color={theme.colors.yellow[6]} />
						</ActionIcon>
						<ActionIcon>
							<Share size={16} color={theme.colors.blue[6]} />
						</ActionIcon>
					</Group>
				</Group>
			</Card.Section>
		</Card>
	);
}
