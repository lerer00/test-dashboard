import type {NextPage} from 'next'
import React, {useState} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../context/authContext";
import firebase from "firebase";
import {LockClosedIcon} from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from "next/link";
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

    const test = () => {
        fetch('/api/secure')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-2">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account {process.env.NEXT_PUBLIC_REGION}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link className="font-medium text-indigo-600 hover:text-indigo-500" href="/signup">Sign
                                    up</Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={loginWithUsernamePassword}
                            >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                              aria-hidden="true"/>
                            </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-3 text-sm text-gray-400">Or continue with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex my-10 space-x-2">
                        <button
                            type="submit"
                            className="relative w-1/3 justify-center rounded-md border border-2 border-gray-300 bg-grey-600 my-2 p-2 px-4 text-sm font-medium text-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={loginWithGoogle}
                        >
                            <span className="flex justify-center">
                              <Image
                                  src="/search.png"
                                  alt="Sign In with Google"
                                  width={20}
                                  height={20}
                              />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
