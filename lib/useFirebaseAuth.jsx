import {useEffect, useState} from 'react'
import firebase from './firebase';

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
            return;
        }

        setLoading(true)
        let formattedUser = formatUser(authState);
        setUser(formattedUser);
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
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
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
