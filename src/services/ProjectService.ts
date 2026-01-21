import ApiService from './ApiService'
import type {
    Project,
    CreateProjectRequest,
    UpdateProjectRequest,
    WorkZone,
    CreateWorkZoneRequest,
    ProjectTeamMember,
    CreateProjectTeamMemberRequest,
    WorkRoute,
    CreateWorkRouteRequest
} from '@/@types/project'
import type { PaginatedResponse } from '@/@types/user'

// ==================== Projects ====================
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
        data: data as any,
    })
}

export async function apiUpdateProject(
    id: string,
    data: UpdateProjectRequest,
) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/projects/${id}`,
        method: 'patch',
        data: data as any,
    })
}

export async function apiDeleteProject(id: string) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/projects/${id}`,
        method: 'delete',
    })
}

// ==================== Work Zones ====================
export async function apiGetWorkZonesByProjectId(projectId: string) {
    return ApiService.fetchDataWithAxios<WorkZone[]>({
        url: `/workzones/project/${projectId}`,
        method: 'get',
    })
}

export async function apiCreateWorkZone(data: CreateWorkZoneRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/workzones',
        method: 'post',
        data: data as any,
    })
}

// ==================== Project Team Members ====================
export async function apiGetProjectTeamMembers(projectId: string) {
    return ApiService.fetchDataWithAxios<ProjectTeamMember[]>({
        url: `/projectteammembers/project/${projectId}`,
        method: 'get',
    })
}

export async function apiAddProjectTeamMember(data: CreateProjectTeamMemberRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/projectteammembers',
        method: 'post',
        data: data as any,
    })
}

export async function apiRemoveProjectTeamMember(id: string) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/projectteammembers/${id}`,
        method: 'delete',
    })
}

// ==================== Work Routes ====================
export async function apiGetWorkRoutesByActivityId(activityId: string) {
    return ApiService.fetchDataWithAxios<WorkRoute[]>({
        url: `/workroutes/activity/${activityId}`,
        method: 'get',
    })
}

export async function apiCreateWorkRoute(data: CreateWorkRouteRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/workroutes',
        method: 'post',
        data: data as any,
    })
}

export async function apiUpdateWorkRoute(id: string, data: Partial<CreateWorkRouteRequest>) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/workroutes/${id}`,
        method: 'patch',
        data: data as any,
    })
}
