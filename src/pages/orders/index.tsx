import { createStyles } from "@mantine/core";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchOrders, fetchUser } from "../../app/slices/currentUser";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Layout } from "../../components/Layout";
import OrderCard from "../../components/OrderCard";

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
            dispatch(fetchUser(String(session.id)))
        }
    }, [session?.id])

    return (
        <Layout>
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
        </Layout >
    );
};

export default Order;
