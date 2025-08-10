export const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://rurawa-backend.onrender.com/api';

const endpointConfig = {
    signIn: '/sign-in',
    signOut: '/sign-out',
    signUp: '/authentication/signup',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
}

export default endpointConfig
