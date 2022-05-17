import { Button, Center, Text } from '@mantine/core'
import { useRouter } from 'next/router';
import React from 'react'
import { ArrowBackUp } from 'tabler-icons-react';

const Unauthorized = () => {
    const router = useRouter();

    return (
        <>
            <Center >
                <Text weight={700}>
                    You are not authorized to visit this page.
                </Text>
            </Center>
            <br />
            <Center>
                <Button compact leftIcon={<ArrowBackUp size={24} strokeWidth={1.5} />} variant="outline" onClick={() => router.push('/')}>
                    Home
                </Button>
            </Center>
        </>
    )
}

export default Unauthorized