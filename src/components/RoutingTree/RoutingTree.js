import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignInForm from '../authPart/SignInForm/SignInForm';
import SignUpForm from '../authPart/SignUpForm/SignUpForm';
import ForgotPassword from '../authPart/ForgotPassword/ForgotPassword';
import ForgotPasswordRedirect from '../authPart/ForgotPasswordRedirect/ForgotPasswordRedirect';
import UpdatePassword from '../authPart/UpdatePassword/UpdatePassword';
import UpdatePasswordRedirect from '../authPart/UpdatePasswordRedirect/UpdatePasswordRedirect';
import MainComponent from '../chatComponents/MainComponent/MainComponent';
import PageNotFound from './../PageNotFound/PageNotFound';
import ReAuthError from '../chatComponents/ReAuthError/ReAuthError';

function RoutingTree() {
    const user = useSelector((state) => state.authReducer.user);

    return user ? (
        <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/error" element={<ReAuthError /> } />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    ) : (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password-redirect" element={<ForgotPasswordRedirect />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-password-redirect" element={<UpdatePasswordRedirect />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}

export default RoutingTree;
