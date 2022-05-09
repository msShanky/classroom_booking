import { createStyles } from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchClassrooms } from "../app/slices/classrooms";
import { fetchUser } from "../app/slices/currentUser";
import { useAppDispatch, useAppSelector } from "../app/store";
import { BookingModal } from "../components/BookingModal";
import { Layout } from "../components/Layout";
import { RoomCard } from "../components/RoomCard";

const useStyles = createStyles(() => ({
	mainContainer: {
		width: "70%",
		margin: "auto",
	},
	cardContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: 'wrap',
		alignItems: "center",
	},
}));

const Home: NextPage = () => {
	const [isModalOpened, setModalOpened] = useState(false);
	const [activeRoom, setActiveRoom] = useState<string>();
	const { classes } = useStyles();
	const { data: session } = useSession()
	const dispatch = useAppDispatch()
	const classrooms = useAppSelector(state => state.classrooms)

	useEffect(() => {
		if (session) {
			dispatch(fetchUser(String(session.id)))
		}
	}, [session?.id])

	useEffect(() => {
		dispatch(fetchClassrooms())
	}, [])


	return (
		<Layout>
			<main className={classes.mainContainer}>
				<BookingModal roomId={activeRoom} opened={isModalOpened} handleClose={() => setModalOpened(false)} />
				<div className={classes.cardContainer}>
					{classrooms.map((room, index) => {
						const uniqueId = `ROOM_${room.roomName}_${(index + 123) * 4568}`;
						return (
							<RoomCard
								key={uniqueId}
								image={room.imageURL}
								title={room.roomName}
								categories={room.tags}
								author={room.authorId}
								likes={room.likeCount}
								created={room.created.seconds * 1000}
								id={room.id}
								onBookNow={(id: string) => {
									setActiveRoom(id);
									setModalOpened(true);
								}}
							/>
						);
					})}
				</div>
			</main>
		</Layout>
	);
};

export default Home;

