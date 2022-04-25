import { createStyles } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { BookingModal } from "../components/BookingModal";
import { LandingHero } from "../components/LandingHero";
import { Layout } from "../components/Layout";
import { RoomCard } from "../components/RoomCard";
import { Room, rooms } from "../data/mock_rooms";

const useStyles = createStyles(() => ({
	mainContainer: {
		width: "70%",
		margin: "auto",
	},
	cardContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const cardProps = {
	image:
		"https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
	category: "decorations",
	title: "Top 50 underrated plants for house decoration",
	footer: "733 people liked this",
	author: {
		name: "Elsa Gardenowl",
		description: "posted 34 minutes ago",
		image:
			"https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
	},
};

const Home: NextPage = () => {
	const [isModalOpened, setModalOpened] = useState(false);
	const [activeRoom, setActiveRoom] = useState<Room>();
	const { classes } = useStyles();

	return (
		<Layout>
			<main className={classes.mainContainer}>
				<BookingModal room={activeRoom} opened={isModalOpened} handleClose={() => setModalOpened(false)} />
				<div className={classes.cardContainer}>
					{rooms.map((room, index) => {
						const uniqueId = `ROOM_${room.name}_${(index + 123) * 4568}`;
						return (
							<RoomCard
								key={uniqueId}
								{...cardProps}
								// room={room}
								// handleRoomBooking={() => {
								// 	setActiveRoom(room);
								// 	setModalOpened(true);
								// }}
							/>
						);
					})}
				</div>
				{/* <div className={classes.cardContainer}>
					<LandingHero />
				</div> */}
			</main>
		</Layout>
	);
};

export default Home;

