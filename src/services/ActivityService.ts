import ApiService from './ApiService'
import type {
    Activity,
    ActivityWithUsers,
    CreateActivityRequest,
    UpdateActivityRequest,
} from '@/@types/activity'
import type { PaginatedResponse } from '@/@types/user'

export async function apiGetActivities(
    pageSize: number = 10,
    pageNumber: number = 1,
) {
    return ApiService.fetchDataWithAxios<PaginatedResponse<Activity>>({
        url: '/activities',
        method: 'get',
        params: { pageSize, pageNumber },
    })
}

export async function apiGetActivitiesByProjectId(projectId: string) {
    return ApiService.fetchDataWithAxios<Activity[]>({
        url: `/activities/project/${projectId}`,
        method: 'get',
    })
}

export async function apiGetActivityById(id: string) {
    return ApiService.fetchDataWithAxios<ActivityWithUsers>({
        url: `/activities/${id}`,
        method: 'get',
    })
}

export async function apiCreateActivity(data: CreateActivityRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/activities',
        method: 'post',
        data,
    })
}

export async function apiUpdateActivity(
    id: string,
    data: UpdateActivityRequest,
) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/activities/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteActivity(id: string) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/activities/${id}`,
        method: 'delete',
    })
}

export async function apiAssignUserToActivity(
    activityId: string,
    userId: string,
) {
    return ApiService.fetchDataWithAxios<void>({
        url: `/activities/${activityId}/users/${userId}`,
        method: 'post',
    })
}

export async function apiUnassignUserFromActivity(
    activityId: string,
    userId: string,
) {
    return ApiService.fetchDataWithAxios<void>({
        url: `/activities/${activityId}/users/${userId}`,
        method: 'delete',
    })
}
