import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ForgotPasswordRedirect from '../ForgotPasswordRedirect/ForgotPasswordRedirect';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import UpdatePasswordRedirect from '../UpdatePasswordRedirect/UpdatePasswordRedirect';
import { signOutRequest } from '../../redux/actions/actions';
import { auth } from './../../firebase';

function RoutingTree() {
    const dispatch = useDispatch();
    const [ user, setUser ] = useState();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return user ? (
        <div>
            <p>{user.email}</p>
            <button
                onClick={() => {
                    dispatch(signOutRequest());
                }}
            >
                Sign Out
            </button>
        </div>
    ) : (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/recover-password" element={<ForgotPassword />} />
            <Route path="/forgot-pass-redirect" element={<ForgotPasswordRedirect />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-pass-redirect" element={<UpdatePasswordRedirect />} />
        </Routes>
    );
}

export default RoutingTree;