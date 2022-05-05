import React, { useState } from "react";
import { Grid, TextInput, Group, Box, Checkbox, Button, Input, InputWrapper, MultiSelect, Modal, LoadingOverlay } from "@mantine/core";
import { CircleCheck } from "tabler-icons-react";
import { DateRangePicker } from "@mantine/dates";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { Layout } from "../../components/Layout";
import { uploadImage } from '../../utils/firebase/storage'
import { addClassRoom } from "../../utils/firebase/database";

const AddClassroom = () => {
    const router = useRouter()
    const [roomName, setRoomName] = useState('');
    const [image, setImage] = useState<[Uint8Array | null, string]>([null, '']);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<String>('');
    const [completed, setCompleted] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [enableBookingDates, setEnableBookingDates] = useState(false);
    const [bookingDates, setBookingDates] = useState<[Date | null, Date | null]>([null, null]);
    const { data: session } = useSession()

    const toggleBookingDates = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnableBookingDates(event.currentTarget.checked)
        if (event.currentTarget.checked) {
            setBookingDates([
                new Date(),
                new Date(new Date().setDate(new Date().getDate() + 7))
            ])
        }
        else {
            setBookingDates([null, null])
        }
    }

    const tags = [
        { value: 'big', label: 'Big' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'hall', label: 'Hall' }
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const options = {
                name: `images/${session?.id}/${Date.now()}`,
                type: image[1],
                image: image[0],
                cbProgress: () => setLoading(true),
                cbError: () => setLoading(false),
                cbSuccess: () => {
                    setLoading(false)
                    setCompleted(true)
                }
            }

            const imageURL = await uploadImage(options)

            const classroomDetails = {
                roomName,
                imageURL,
                tags: selectedTags,
                startDate: bookingDates[0],
                closeDate: bookingDates[1],
                authorId: session?.id,
            }

            await addClassRoom(classroomDetails);

        } catch (e) {
            console.error(e)
            setError('Something went wrong!')
        }
    }

    return (
        <Layout>
            <Modal
                opened={!!error}
                onClose={() => setError('')}
                title="Oops! Something went Wrong."
                centered
            >
                {error}
            </Modal>
            <Modal
                opened={!!completed}
                onClose={() => router.push('/')}
                centered
                withCloseButton={false}
            >
                <Group position="center">
                    <CircleCheck
                        size={60}
                        strokeWidth={1}
                        color={'#40bf6c'}
                    />
                    Success! Classroom added
                </Group>
            </Modal>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={handleSubmit}>
                    <LoadingOverlay visible={loading} />
                    <Grid grow gutter="xl" justify='center' align='center'>
                        <Grid.Col span={12}>
                            <TextInput
                                required
                                label="Classroom Name"
                                placeholder="Enter name of classroom eg.Room A5"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <InputWrapper
                                id="class-image"
                                required
                                label="Classroom Image"
                                description="Upload picture of the classroom"

                            >
                                <Input
                                    id="class-image"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.files?.length) {
                                            const file = e.target.files[0]
                                            const reader = new window.FileReader();
                                            reader.readAsArrayBuffer(file);
                                            reader.onloadend = (evt) => {
                                                if (evt.target && (evt.target.readyState === FileReader.DONE)) {
                                                    const arrayBuffer = evt.target.result
                                                    console.log('type', typeof arrayBuffer)
                                                    const array = new Uint8Array(arrayBuffer);
                                                    setImage([array, file.type])
                                                }
                                            }
                                        }
                                    }}
                                    type="file"
                                    accept="image/*" />
                            </InputWrapper>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <MultiSelect
                                required
                                label="Tags"
                                placeholder="Pick all relatable tags"
                                data={tags}
                                value={selectedTags} onChange={setSelectedTags}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Grid grow gutter="xs">
                                <Grid.Col>
                                    <Checkbox
                                        label="Opening and Closing dates"
                                        checked={enableBookingDates}
                                        onChange={toggleBookingDates}
                                    />

                                </Grid.Col>
                                <Grid.Col>
                                    <DateRangePicker
                                        disabled={!enableBookingDates}
                                        placeholder="Pick open and end dates"
                                        value={bookingDates}
                                        onChange={setBookingDates}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group position="right" mt="md">
                                <Button variant="outline" type="submit">Submit</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </form>
            </Box>
        </Layout >
    );
};

export default AddClassroom;
