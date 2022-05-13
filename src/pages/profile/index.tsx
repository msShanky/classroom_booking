import { Accordion, createStyles, Group, Text, Badge, Avatar, Button } from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, Heart } from "tabler-icons-react";
import { fetchUser } from "../../app/slices/currentUser";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { BookingModal } from "../../components/BookingModal";
import { Layout } from "../../components/Layout";
import { RoomCard } from "../../components/RoomCard";

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
    const { classes, theme } = useStyles();
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const { likes, bookmarks, image, name, email, provider } = useAppSelector(state => state.currentUser)

    useEffect(() => {
        if (session) {
            dispatch(fetchUser(String(session.id)))
        }
    }, [session?.id])

    return (
        <Layout>
            <main className={classes.mainContainer}>
                <Group>
                    <Avatar radius="xs" size="xl" src={image} />
                    <div>
                        <Text
                            weight={600}
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                        >
                            {name}
                        </Text>
                        <Text size="sm" weight={500}>{email}</Text>
                    </div>
                </Group>
                <br />
                <Link href='/orders'><a><Button variant="outline" color="teal"  >View My Orders</Button></a></Link>
                <br />
                <br />
                <BookingModal userId={String(session?.id)} roomId={activeRoom} opened={isModalOpened} handleClose={() => setModalOpened(false)} />
                <Accordion iconPosition="right" iconSize={40}>
                    <Accordion.Item
                        label={(
                            <Group noWrap>
                                <Bookmark
                                    fill={theme.colors.yellow[6]}
                                    size={32}
                                    color={theme.colors.yellow[6]} />
                                <Text>
                                    Bookmarks&nbsp;
                                    <Badge size="lg" color="yellow">{bookmarks.length}</Badge>
                                </Text>
                            </Group>
                        )}>
                        <div className={classes.cardContainer}>
                            {bookmarks.map((room, index) => {
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
                    </Accordion.Item>
                    <Accordion.Item
                        label={(
                            <Group noWrap>
                                <Heart
                                    fill={theme.colors.red[6]}
                                    size={32}
                                    color={theme.colors.red[6]} />
                                <Text>
                                    Liked Rooms&nbsp;
                                    <Badge size="lg" color="red">{likes.length}</Badge>
                                </Text>
                            </Group>
                        )}>

                        <div className={classes.cardContainer} >

                            {likes.map((room, index) => {
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
                    </Accordion.Item>
                </Accordion>
            </main>
        </Layout >
    );
};

export default Home;

