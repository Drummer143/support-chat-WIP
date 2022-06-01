import { NavLink } from 'react-router-dom';

function PageNotFound() {
    return (
        <div>
            <p>
                Page not found. <NavLink to="/">Return to main page</NavLink>
            </p>
        </div>
    );
}

export default PageNotFound;
