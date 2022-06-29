import { Container, createStyles, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowNarrowRight } from "tabler-icons-react";
import { fetchOrders } from "../../app/slices/currentUser";
import { useAppDispatch, useAppSelector } from "../../app/store";
import OrderCard from "../../components/OrderCard";
import withAuth from "../../utils/HOC/withAuth";

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

const Order: NextPage = () => {
    const { classes } = useStyles();
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const { orders } = useAppSelector(state => state.currentUser)

    useEffect(() => {
        if (session) {
            dispatch(fetchOrders(String(session.id)))
        }
    }, [session?.id])

    const NoOrders = () => {
        return (
            <Container style={{ maxWidth: 1024, height: 500, paddingTop: '5%' }}>
                <div className='flex flex-col'>
                    <div>
                        <Title order={1}>Oops! There are no orders.</Title>
                    </div>
                    <br /><br /><br />
                    <div>
                        <Link href={'/'}>
                            <Text weight={'bold'} size="lg" color={'#4f46e5'} className='flex cursor-pointer items-center'>
                                Look for Classrooms&nbsp;
                                <ArrowNarrowRight
                                    size={24}
                                    strokeWidth={3}
                                    color={'#4f46e5'}
                                />
                            </Text>
                        </Link>
                    </div>
                </div>
            </Container>
        )
    }

    if (!orders.length) return <NoOrders />
    return (
        <div className={classes.cardContainer}>
            {orders.map((order) => {
                const uniqueId = `ORDER_${order.id}_`;
                return (
                    <OrderCard
                        roomId={order.roomId}
                        userId={order.userId}
                        room={order.room}
                        slot={order.slot}
                        bookingDate={order.bookingDate}
                        bookedOn={order.bookedOn}
                        cancelled={order.cancelled}
                        id={order.id}
                        key={uniqueId}
                    />
                );
            })}
        </div>
    );
};

export default withAuth(Order);

