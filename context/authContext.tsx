import React, {createContext, useContext} from 'react'
import useFirebaseAuth from '../lib/useFirebaseAuth';

type authContextType = {
    user: any,
    loading: boolean,
    signInWithEmailAndPassword: Function,
    createUserWithEmailAndPassword: Function,
    signInWithRedirect: Function,
    signOut: Function
};

const authContextDefaultValues: authContextType = {
    user: null,
    loading: true,
    signInWithEmailAndPassword: async () => {
    },
    createUserWithEmailAndPassword: async () => {
    },
    signInWithRedirect: async() => {
    },
    signOut: async () => {
    }
};

const authContext = createContext<authContextType>(authContextDefaultValues);

export interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const auth = useFirebaseAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
