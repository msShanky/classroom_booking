import { Center, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/store";
import Unauthorized from "../../components/Unauthorized";

const withAuth = (WrappedComponent, isAdmin?: boolean) => {

  return (props: any) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const { type } = useAppSelector(state => state.currentUser)

    const Loading = () => <Center><Loader size="lg" variant="bars" /></Center>

    useEffect(() => {
      if (!(status === 'loading') && !session?.id) {
        showNotification({
          title: 'Unauthorized',
          message: 'Please Login to continue!',
          color: 'red',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[6],
              borderColor: theme.colors.red[6],
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.red[7] },
            },
          })
        })
        router.push("/");
      }
    }, [session, status])

    if (status === 'loading') return <Loading />

    if (isAdmin && status === 'authenticated') {
      if (typeof type === 'undefined') return <Loading />
      if (type === 'Admin')
        return <WrappedComponent {...props} />
      return <Unauthorized />
    }
    if (isAdmin && status === 'unauthenticated') return <Loading />

    return <WrappedComponent {...props} />
  }
}

export default withAuth;