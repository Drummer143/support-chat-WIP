import { useSelector, useDispatch } from 'react-redux';
import { auth } from './../../firebase';
import { Routes, Route } from 'react-router-dom';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { signOut } from '../../redux/actions/actions';

function AuthRouter() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user)

    return user ? (
        <div>
            {console.log(user)}
            <p>{user.email}</p>
            <button onClick={() => { dispatch(signOut()) }}>Sign Out</button>
        </div>

    ) : (
        <Routes>
            <Route path="/" element={<SignInForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
    );
}

export default AuthRouter;