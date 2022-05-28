import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import RecoverTransition from '../RecoverTransition/RecoverTransition';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import { signOutRequest } from '../../redux/actions/actions';

function RoutingTree() {
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
            <Route path="recover-transition" element={<RecoverTransition />} />
            <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
    );
}

export default RoutingTree;