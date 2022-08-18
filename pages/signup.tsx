import React, {useState} from 'react';
import {useRouter} from 'next/router';

import {useAuth} from '../context/authContext';
import firebase from 'firebase/app';
import {Alert, Box, Button, Container, FormGroup, TextField} from "@mui/material";

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [error, setError] = useState("");

    const {createUserWithEmailAndPassword} = useAuth();

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setError("")
        if (passwordOne === passwordTwo)
            createUserWithEmailAndPassword(email, passwordOne)
                .then((authUser: firebase.auth.AuthCredential) => {
                    console.log("Success. The user is created in firebase", authUser)
                    router.push("/dashboard");
                })
                .catch((error: any) => {
                    setError(error.message)
                });
        else
            setError("Password do not match")
        event.preventDefault();
    };

    return (
        <Container className="text-center">
            <Box>
                <form>
                    {error && <Alert severity="error">{error}</Alert>}
                    <FormGroup row>
                        <TextField
                            type="email"
                            id="signup-email"
                            label="email"
                            variant="outlined"
                            placeholder="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <TextField
                            type="password"
                            id="signup-password-one"
                            label="password"
                            variant="outlined"
                            placeholder="password"
                            value={passwordOne}
                            onChange={(event) => setPasswordOne(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <TextField
                            type="password"
                            id="signup-password-two"
                            label="password"
                            variant="outlined"
                            placeholder="password"
                            value={passwordTwo}
                            onChange={(event) => setPasswordTwo(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Button onClick={onSubmit}>Sign Up</Button>
                    </FormGroup>
                </form>
            </Box>
        </Container>
    )
}

export default SignUp;
