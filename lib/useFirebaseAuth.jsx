import {useEffect, useState} from 'react'
import firebase from './firebase';
import nookies from 'nookies';

const formatUser = (user) => ({
    uid: user.uid,
    email: user.email
});

export default function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setLoading(false)
            nookies.set(undefined, 'token', '', { path: '/' });
            return;
        }

        setLoading(true)
        console.log(authState)
        const token = await authState.getIdToken();
        let formattedUser = formatUser(authState);
        setUser(formattedUser);
        nookies.set(undefined, 'token', token, { path: '/' });
        setLoading(false);
    };

    const clear = () => {
        setUser(null);
        setLoading(true);
    };

    const signInWithEmailAndPassword = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);

    const createUserWithEmailAndPassword = (email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email, password);

    const signInWithRedirect = (provider) =>
        firebase.auth().signInWithRedirect(provider)

    const signOut = () =>
        firebase.auth().signOut().then(clear);

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signInWithRedirect,
        signOut
    };
}
