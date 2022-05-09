import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { Modal, Button, Group, Grid, Text, Chips, Chip, createStyles } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useAppSelector } from "../app/store";

const useStyles = createStyles((theme) => ({
	chip: {
		textAlign: 'center',
		width: '45%',
		'& label': {
			height: 'auto',
			width: '100%',
			lineHeight: '1.5',
			padding: '2px 0'
		}
	}
}));

type BookingModalProps = {
	opened: boolean;
	handleClose: () => void;
	roomId?: string;
};

interface Slot {
	name: string;
	value: string;
	time: string;
	disabled?: boolean
}

export const BookingModal: FunctionComponent<BookingModalProps> = (props) => {
	const { opened, roomId, handleClose } = props;
	const classrooms = useAppSelector(state => state.classrooms)
	const room = classrooms.filter(classroom => classroom.id === roomId)[0]
	const { classes } = useStyles();
	const [enableSubmit, setEnableSubmit] = useState(false)
	const [bookingDate, setBookingDate] = useState<Date | null>(null)
	const [bookingSlot, setBookingSlot] = useState<string | string[]>('')

	const slots: Slot[] = [
		{ name: 'Slot 1', value: '1', time: '8am - 9am' },
		{ name: 'Slot 2', value: '2', time: '9am - 10am' },
		{ name: 'Slot 3', value: '3', time: '10am - 11am' },
		{ name: 'Slot 4', value: '4', time: '11am - 12pm' },
		{ name: 'Slot 5', value: '5', time: '12pm - 1am' },
		{ name: 'Slot 6', value: '6', time: '1pm - 2pm' },
		{ name: 'Slot 7', value: '7', time: '2pm - 3pm' },
		{ name: 'Slot 8', value: '8', time: '3pm - 4pm' },
		{ name: 'Slot 9', value: '9', time: '4pm - 5pm' },
	]

	const renderError = () => (
		<Group position="center">
			<AlertCircle
				size={60}
				strokeWidth={1}
				color={'#cc0000'}
			/>
			Something went wrong! Please try again later.
		</Group>
	)

	useEffect(() => {
		setEnableSubmit(false)
		setBookingDate(null)
		setBookingSlot('')
	}, [room])

	useEffect(() => {
		
	
	}, [bookingDate])

	useEffect(() => {
		setEnableSubmit(!!(bookingDate && bookingSlot))
	}, [bookingDate, bookingSlot])


	return (
		<Modal opened={opened} onClose={handleClose} withCloseButton={false}>
			{!room ? renderError() : (
				<Grid>
					<Grid.Col span={12}>
						<Text weight={700} mt="xs">
							{room.roomName}
						</Text>
					</Grid.Col>
					<Grid.Col>
						<DatePicker
							value={bookingDate}
							onChange={setBookingDate}
							placeholder="Pick date"
							label="Event date"
							dropdownType="modal"
							minDate={new Date()}
							maxDate={dayjs(new Date()).add(30, 'days').toDate()}
						/>
					</Grid.Col>
					{bookingDate && (
						<>
							<Grid.Col span={12}>
								<Text>
									Select from the Available Slots
								</Text>
							</Grid.Col>
							<Grid.Col span={12}>
								<Chips color="green" variant="filled" spacing="md" size="md" radius="md" value={bookingSlot} onChange={setBookingSlot}>
									{slots.map(slot => (
										<Chip value={slot.value} className={classes.chip} disabled={!!slot?.disabled}>
											{slot.name}<br />(&nbsp;{slot.time}&nbsp;)
										</Chip>
									))}
								</Chips>
							</Grid.Col>
							<Grid.Col span={12}>
								<Button fullWidth size="md" onClick={() => { }} variant="outline" color="teal" disabled={!enableSubmit}>Book Now</Button>
							</Grid.Col>
						</>
					)}
				</Grid>
			)}
		</Modal>
	);
};
