import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // signIn with google
    const googleProvider = new GoogleAuthProvider();

    // signInWithGoogle method apply
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // email password signUp
    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signIn
    const signIn = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //logout
    const logOut = () => {
        return signOut(auth);
    }


    // display uer name & photoURL
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    // verify Email
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }












    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('auth state changed', currentUser);

            // jokhon kono user/error pabe tokhon loging(sprier) off hye jabe

        })

        return () => {
            unsubscribe();
        }
    }, []);



    const authInfo = { user, signInWithGoogle, createUser, logOut, signIn, updateUserProfile, verifyEmail };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;