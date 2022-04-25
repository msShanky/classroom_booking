import React, { FunctionComponent } from "react";
import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { Room } from "../data/mock_rooms";

type BookingModalProps = {
	opened: boolean;
	handleClose: () => void;
	room?: Room;
};

export const BookingModal: FunctionComponent<BookingModalProps> = (props) => {
	const { opened, room, handleClose } = props;
	return (
		<Modal opened={opened} onClose={handleClose} title="Class Room Booking!">
			{/* Modal content */}
			<h1>{room?.name}</h1>
			<p>This is the modal content</p>
		</Modal>
	);
};
