import ApiService from './ApiService'
import type {
    Project,
    CreateProjectRequest,
    UpdateProjectRequest,
} from '@/@types/project'
import type { PaginatedResponse } from '@/@types/user'

export async function apiGetProjects(
    pageSize: number = 100,
    pageNumber: number = 1,
) {
    return ApiService.fetchDataWithAxios<PaginatedResponse<Project>>({
        url: '/projects',
        method: 'get',
        params: { pageSize, pageNumber },
    })
}

export async function apiGetProjectById(id: string) {
    return ApiService.fetchDataWithAxios<Project>({
        url: `/projects/${id}`,
        method: 'get',
    })
}

export async function apiCreateProject(data: CreateProjectRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/projects',
        method: 'post',
        data,
    })
}

export async function apiUpdateProject(
    id: string,
    data: UpdateProjectRequest,
) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/projects/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteProject(id: string) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/projects/${id}`,
        method: 'delete',
    })
}
