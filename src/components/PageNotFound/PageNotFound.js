import { Navigate, useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    return <Navigate to="/" />;
    /* (
        <div>
            <p>
                Page not found. <NavLink to="/">Return to main page</NavLink>
            </p>
        </div>
    ); */
}

export default PageNotFound;
