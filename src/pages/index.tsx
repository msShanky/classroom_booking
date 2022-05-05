import { createStyles } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { BookingModal } from "../components/BookingModal";
import { Layout } from "../components/Layout";
import { RoomCard } from "../components/RoomCard";
import { Room, rooms } from "../data/mock_rooms";
import { getAllClassrooms } from "../utils/firebase/database";

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

const Home: NextPage = ({ classrooms }) => {
	const [isModalOpened, setModalOpened] = useState(false);
	const [activeRoom, setActiveRoom] = useState<Room>();
	const { classes } = useStyles();

	return (
		<Layout>
			<main className={classes.mainContainer}>
				<BookingModal room={activeRoom} opened={isModalOpened} handleClose={() => setModalOpened(false)} />
				<div className={classes.cardContainer}>
					{classrooms.map((room, index) => {
						const uniqueId = `ROOM_${room.name}_${(index + 123) * 4568}`;
						return (
							<RoomCard
								key={uniqueId}
								image={room.imageURL}
								title={room.name}
								categories={room.tags}
								author={room.authorId}
								likes={room.likeCount}
								created={room.created.seconds * 1000}
							/>
						);
					})}
				</div>
			</main>
		</Layout>
	);
};

export async function getServerSideProps() {
	const classrooms = await getAllClassrooms();
	return {
		props: {
			classrooms: JSON.parse(JSON.stringify(classrooms))
		},
	}
}

export default Home;

