import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from '../context/authContext';
import {Box, Button, Container, LinearProgress} from "@mui/material";

const LoggedIn = () => {
    const {user, loading, signOut} = useAuth();
    const router = useRouter();

    // Listen for changes on loading and user, redirect if needed
    useEffect(() => {
        if (!loading && !user)
            router.push('/')
    }, [user, loading])

    const test = () => {
        fetch('/api/secure')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
    }


    return (
        <Container>
            {
                loading ?
                    <Box>
                        <LinearProgress/>
                    </Box> :
                    <>
                        <Box>
                            {user && <div>Congratulations {user?.email}! You are logged in.</div>}
                        </Box>
                        <Box>
                            <Button onClick={() => signOut()}>Sign out</Button>
                            <Button onClick={test}>test</Button>
                        </Box>
                    </>
            }
        </Container>
    )
}

export default LoggedIn;
