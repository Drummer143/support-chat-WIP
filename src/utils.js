export const handleAuthError = (error) => {
    switch(error.code) {
        case "auth/user-not-found": return "ERROR: User with entered email was not found";
        case "auth/wrong-password": return "ERROR: Invalid password.";
        case "auth/too-many-requests": return "ERROR: Exceeded the number of login attempts. Check your email and password and try to login later.";
        default: return "Unexpected error. Contact support to solve the problem."
    }
}