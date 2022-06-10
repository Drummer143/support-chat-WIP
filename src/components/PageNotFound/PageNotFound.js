import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PageNotFound() {
    let path;
    if (useSelector((state) => state.authReducer.user)) {
        path = '/main/dialogs';
    } else {
        path = '/sign-in';
    }

    return <Navigate to={path} />;
    /* (
        <div>
            <p>
                Page not found. <NavLink to="/">Return to main page</NavLink>
            </p>
        </div>
    ); */
}

export default PageNotFound;
