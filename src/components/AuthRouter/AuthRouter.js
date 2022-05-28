import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import RecoverInfo from '../RecoverInfo/RecoverInfo';
import { signOutRequest } from '../../redux/actions/actions';

function AuthRouter() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user)

    return user ? (
        <div>
            <p>{user.email}</p>
            <button onClick={() => { dispatch(signOutRequest()) }}>Sign Out</button>
        </div>

    ) : (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/recover-password" element={<ForgotPassword />} />
            <Route path="recover-info" element={<RecoverInfo />} />
        </Routes>
    );
}

export default AuthRouter;