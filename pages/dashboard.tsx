import {useEffect} from 'react';
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
                        </Box>
                    </>
            }
        </Container>
    )
}

export default LoggedIn;
