import { Container, Text, Title } from '@mantine/core';
import Link from 'next/link'
import React from 'react'
import { SignLeft } from 'tabler-icons-react';

const Error404 = () => {
    return (
        <Container style={{ maxWidth: 1024, height: 500, paddingTop: '5%' }}>
            <div className='flex flex-col'>
                <div>
                    <Title order={1}>Oops! The room you are searching doesn&apos;t exist.</Title>
                    <Title order={4}>404 not found.</Title>
                </div>
                <br/><br/><br/>
                <div>
                    <Link href={'/'} passHref>
                            <Text weight={'bold'} size="lg" color={'#4f46e5'} className='flex cursor-pointer items-center'>
                                <SignLeft
                                    size={48}
                                    strokeWidth={2}
                                    color={'#4f46e5'}
                                />
                                Classrooms are this way!!
                            </Text>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default Error404 