import type {NextPage} from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useState} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../context/authContext";
import Link from "next/link";
import firebase from "firebase";
import {Alert, Box, Button, FormGroup, TextField} from "@mui/material";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

const provider = new GoogleAuthProvider();

const Home: NextPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {user, signInWithEmailAndPassword, signInWithRedirect} = useAuth();
    const router = useRouter();

    // if user is already logged in move to dashboard
    if (user)
        router.push('/dashboard');

    const loginWithUsernamePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        setError(null)
        signInWithEmailAndPassword(email, password)
            .then((authUser: firebase.auth.AuthCredential) => {
                console.log("Success email/password", authUser)
                router.push('/dashboard');
            })
            .catch((error: any) => {
                setError(error.message)
            });
        event.preventDefault();
    };

    const loginWithGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setError(null)
        signInWithRedirect(provider)
        event.preventDefault();
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>{process.env.NEXT_PUBLIC_REGION}</h1>
                <Box component="form"
                     noValidate
                     autoComplete="off">
                    {error && <Alert severity="error">{error}</Alert>}
                    <div>
                    <TextField
                        size="small"
                        type="email"
                        id="login-email"
                        label="email"
                        variant="outlined"
                        placeholder="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    </div>
                    <div>
                    <TextField
                        size="small"
                        type="password"
                        id="login-password"
                        label="password"
                        variant="outlined"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    </div>

                    <Button onClick={loginWithUsernamePassword}>Login</Button>
                    No account? <Link href="/signup">Sign up</Link>
                </Box>
                <FormGroup row>
                    <Button onClick={(e) => {
                        loginWithGoogle(e)
                    }}>Google</Button>
                </FormGroup>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default Home
