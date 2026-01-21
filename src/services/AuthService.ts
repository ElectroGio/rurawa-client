import ApiService from './ApiService'
import endpointConfig, { apiBaseURL } from '@/configs/endpoint.config'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    VerifyPhone,
    RefreshTokenRequest,
    RefreshTokenResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: endpointConfig.signIn,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: endpointConfig.signUp,
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.signOut,
        method: 'post',
    })
}

export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.forgotPassword,
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.resetPassword,
        method: 'post',
        data,
    })
}

export async function apiVerifyPhone<T>(data: VerifyPhone) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.verifyPhone,
        method: 'post',
        data,
    })
}

export async function apiResendVerificationCode<T>(userId: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${endpointConfig.resendVerificationCode}/${userId}`,
        method: 'post',
    })
}

export async function apiRefreshToken(data: RefreshTokenRequest) {
    return ApiService.fetchDataWithAxios<RefreshTokenResponse>({
        url: endpointConfig.refreshToken,
        method: 'post',
        data,
    })
}

export async function apiGetCurrentUser() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.currentUser,
        method: 'get',
    })
}
