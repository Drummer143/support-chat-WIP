import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from 'reactstrap';

import SignInForm from '../authPart/SignInForm/SignInForm';
import SignUpForm from '../authPart/SignUpForm/SignUpForm';
import ForgotPassword from '../authPart/ForgotPassword/ForgotPassword';
import ForgotPasswordRedirect from '../authPart/ForgotPasswordRedirect/ForgotPasswordRedirect';
import UpdatePassword from '../authPart/UpdatePassword/UpdatePassword';
import UpdatePasswordRedirect from '../authPart/UpdatePasswordRedirect/UpdatePasswordRedirect';
import MainComponent from '../MainComponent/MainComponent';
import { auth } from './../../firebase';

function RoutingTree() {
    const [ user, loading ] = useAuthState(auth);

    return loading ? <Spinner /> : user ? (
        <Routes>
            <Route path="/" element={<MainComponent />} />
        </Routes>
    ) : (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password-redirect" element={<ForgotPasswordRedirect />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-password-redirect" element={<UpdatePasswordRedirect />} />
        </Routes>
    );
}

export default RoutingTree;
