import * as Yup from 'yup';

export const handleAuthError = (error) => {
    switch(error.code) {
        case "auth/user-not-found": return "ERROR: User with entered email was not found";
        case "auth/wrong-password": return "ERROR: Invalid password.";
        case "auth/too-many-requests": return "ERROR: Exceeded the number of login attempts. Check your email and password and try to login later.";
        default: return "Unexpected error. Contact support to solve the problem."
    }
}

export const emailSignInValSchema = Yup.string().required("This field is required");
export const passwordSignInValSchema = Yup.string().required("This field is required");

export const emailSignUpValSchema = Yup.string().email("Invalid address. Example: suppurt-chat@example.com").required("This field is required");
export const passwordSignUpValSchema = Yup.string().min(6, 'Must be 6 characters or more').max(20, 'Must be 20 characters or less').required("This field is required");

export const confirmPassword = Yup.string().oneOf([Yup.ref('password')], "Passwords does not match").required("This field is required");