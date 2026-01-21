import ApiService from './ApiService'
import type {
    Group,
    GroupWithUsers,
    CreateGroupRequest,
    UpdateGroupRequest,
} from '@/@types/group'

export async function apiGetGroups(companyId: string) {
    return ApiService.fetchDataWithAxios<Group[]>({
        url: '/groups',
        method: 'get',
        params: { companyId },
    })
}

export async function apiGetGroupById(id: string) {
    return ApiService.fetchDataWithAxios<GroupWithUsers>({
        url: `/groups/${id}`,
        method: 'get',
    })
}

export async function apiCreateGroup(data: CreateGroupRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/groups',
        method: 'post',
        data,
    })
}

export async function apiUpdateGroup(id: string, data: UpdateGroupRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/groups/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteGroup(id: string) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/groups/${id}`,
        method: 'delete',
    })
}

export async function apiAddUserToGroup(groupId: string, userId: string) {
    return ApiService.fetchDataWithAxios<void>({
        url: `/groups/${groupId}/users/${userId}`,
        method: 'post',
    })
}

export async function apiRemoveUserFromGroup(groupId: string, userId: string) {
    return ApiService.fetchDataWithAxios<void>({
        url: `/groups/${groupId}/users/${userId}`,
        method: 'delete',
    })
}
