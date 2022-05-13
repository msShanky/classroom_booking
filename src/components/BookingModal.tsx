import React, { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { Modal, Button, Group, Grid, Text, Chips, Chip, createStyles } from "@mantine/core";
import { AlertCircle, CircleCheck } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useAppSelector } from "../app/store";
import { bookClassroom, listenSlots } from "../utils/firebase/database";
import { DocumentData, Unsubscribe } from "firebase/firestore";
import { useRouter } from "next/router";
import { slotReference } from "../constants/slot";

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
	userId?: string;
};

interface Slot {
	name: string;
	value: string;
	time: string;
	disabled?: boolean
}

export const BookingModal: FunctionComponent<BookingModalProps> = (props) => {
	const { opened, roomId, handleClose, userId } = props;
	const router = useRouter()
	const classrooms = useAppSelector(state => state.classrooms)
	const room = classrooms.filter(classroom => classroom.id === roomId)[0]
	const { classes } = useStyles();
	const [enableSubmit, setEnableSubmit] = useState(false)
	const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null)
	const [bookingDate, setBookingDate] = useState<Date | null>(null)
	const [bookingSlot, setBookingSlot] = useState<string | string[]>('')
	const [slots, setSlots] = useState<Slot[]>([])
	const [error, setError] = useState<string>('')
	const [isComplete, setIsComplete] = useState<boolean>(false)

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

	const renderSuccess = () => (
		<Group position="center">
			<CircleCheck
				size={60}
				strokeWidth={1}
				color={'#40bf6c'}
			/>
			Booked Successfully!
		</Group>
	)

	const resetState = () => {
		setEnableSubmit(false)
		setBookingDate(null)
		setBookingSlot('')
	}

	useEffect(() => {
		resetState()
	}, [room])

	useEffect(() => {
		if (bookingDate) {
			if (unsubscribe) unsubscribe()
			listenSlots({ roomId: String(roomId), bookingDate }, (slotsData: DocumentData[], unsubscribe: Unsubscribe) => {
				const bookedSlots: string[] = slotsData.map(slot => slot.slot)
				setUnsubscribe(unsubscribe);
				setSlots(Object.keys(slotReference).map(slot => {
					const s = { name: `Slot ${slot}`, value: slot, time: slotReference[slot] }
					if (bookedSlots.includes(slot)) return { ...s, disabled: true }
					else return s
				}))
			})
		}
		return () => {
			if (unsubscribe) unsubscribe()
		}
	}, [bookingDate])

	useEffect(() => {
		setEnableSubmit(!!(bookingDate && bookingSlot))
	}, [bookingDate, bookingSlot])


	const handleSubmit = async () => {
		try {
			if (roomId && bookingDate && userId && bookingSlot) {
				await bookClassroom({
					roomId,
					bookingDate,
					userId,
					slot: String(bookingSlot)
				})
				setIsComplete(true)
				setTimeout(() => {
					router.push('/orders')
				}, 2000);
			}

		} catch (error) {
			setError(String(error))
		}

	}

	return (
		<Modal
			opened={opened}
			onClose={() => {
				resetState()
				handleClose()
			}}
			withCloseButton={false}
		>
			{isComplete ? renderSuccess() : ((!room || error) ? renderError() : (
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
					{(bookingDate && slots.length) ? (
						<>
							<Grid.Col span={12}>
								<Text>
									Select from the Available Slots
								</Text>
							</Grid.Col>
							<Grid.Col span={12}>
								<Chips color="green" variant="filled" spacing="md" size="md" radius="md" value={bookingSlot} onChange={setBookingSlot}>
									{slots.map(slot => (
										<Chip key={slot.value} value={slot.value} className={classes.chip} disabled={!!slot?.disabled}>
											{slot.name}<br />(&nbsp;{slot.time}&nbsp;)
										</Chip>
									))}
								</Chips>
							</Grid.Col>
							<Grid.Col span={12}>
								<Button fullWidth size="md" onClick={() => { handleSubmit() }} variant="outline" color="teal" disabled={!enableSubmit}>Book Now</Button>
							</Grid.Col>
						</>
					) : <></>}
				</Grid>
			))}
		</Modal>
	);
};
