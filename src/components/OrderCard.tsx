import React from "react";
import { createStyles, Card, Image, Group, Text, Badge, Button } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { ClassroomState } from "../app/slices/classrooms";
import { slotReference } from "../constants/slot";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		margin: '5px'
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

interface OrderCardProps {
	roomId: string;
	userId: any;
	room: ClassroomState;
	user?: string;
	slot: string;
	bookingDate: { seconds: number };
	bookedOn: { seconds: number };
	cancelled?: boolean;
	id: string
}

interface Author {
	name?: string;
	image?: string;
	bookmarks?: string[];
}

export default function OrderCard(options: OrderCardProps) {

	const { roomId, userId, room, user, slot, bookingDate, bookedOn, cancelled, id } = options
	const { imageURL, roomName, tags } = room
	const { classes } = useStyles();

	dayjs.extend(relativeTime)

	return (
		<Card withBorder p="lg" radius="md" shadow='sm' className={classes.card}>
			<Card.Section mb="sm">
				<Image src={imageURL} alt={roomName} height={180} />
			</Card.Section>

			<div>
				{tags.map((tag, index) => <Badge key={`${index + 1}category${tag}`}>{tag}</Badge>)}
			</div>

			<Text weight={600} className={classes.title} mt="xs">
				{roomName}
			</Text>

			<Group position="center" mt="xs">
				<Text weight={600} align="center" >{dayjs(bookingDate?.seconds * 1000).format('MMMM D, YYYY')}</Text>
				<Badge fullWidth color="orange" size="lg" radius="sm" >
					<Text>{slotReference[slot]}</Text>
				</Badge>
			</Group>

			<Group mt="lg">
				<Text size="xs" color="dimmed">
					Booked {dayjs(bookedOn?.seconds * 1000).toNow(true)} ago
				</Text>
			</Group>

			<Card.Section className={classes.footer}>
				<Group position="apart" mt="xs">
					{cancelled
						? <Badge fullWidth color="red" size="xl" radius="xs">Cancelled</Badge>
						: <Button fullWidth onClick={() => { }} variant="outline" color="red" compact disabled={cancelled}>Cancel Booking</Button>
					}
				</Group>
			</Card.Section>
		</Card >
	);
}
