import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY || "apikey-wrong",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "authdomain-wrong",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "projectid-wrong"
}

// if a firebase app hasn't already been created
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseCredentials)
}

export default firebase;
