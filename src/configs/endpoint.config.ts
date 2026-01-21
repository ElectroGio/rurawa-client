export const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://rurawa-backend.onrender.com/api';

const endpointConfig = {
    signIn: '/authentication/login',
    signOut: '/authentication/logout',
    signUp: '/authentication/register',
    forgotPassword: '/authentication/forgot-password',
    resetPassword: '/authentication/reset-password',
    verifyPhone: '/authentication/verify-phone',
    resendVerificationCode: '/authentication/resend-verification-code',
    refreshToken: '/authentication/refresh-token',
    currentUser: '/authentication/me',
}

export default endpointConfig
