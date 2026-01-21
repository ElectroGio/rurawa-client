import ApiService from './ApiService'
import type {
    User,
    CreateUserRequest,
    UpdateUserRequest,
    PaginatedResponse,
} from '@/@types/user'

export async function apiGetUsers(
    companyId?: string,
    pageSize: number = 10,
    pageNumber: number = 1,
) {
    const params: Record<string, any> = { pageSize, pageNumber }
    if (companyId) {
        params.companyId = companyId
    }

    return ApiService.fetchDataWithAxios<PaginatedResponse<User>>({
        url: '/users',
        method: 'get',
        params,
    })
}

export async function apiGetUserById(id: string) {
    return ApiService.fetchDataWithAxios<User>({
        url: `/users/${id}`,
        method: 'get',
    })
}

export async function apiCreateUser(data: CreateUserRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/users',
        method: 'post',
        data,
    })
}

export async function apiUpdateUser(id: string, data: UpdateUserRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/users/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteUser(id: string) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/users/${id}`,
        method: 'delete',
    })
}
