export interface Project {
    id: string
    name: string
    description: string
    location: string
    imageUrl?: string
    state: string
    startDate?: string
    endDate?: string
    companyId: string
    managerId: string
}

export interface WorkZone {
    id: string
    projectId: string
    name: string
    municipality: string
    department: string
    veredas: string[] // JSON parsed array
    mapCoordinates?: any // JSON for map polygons/markers
}

export interface ProjectTeamMember {
    id: string
    projectId: string
    userId: string
    role: 'Director' | 'Coordinador' | 'Supervisor' | 'Analista' | 'Tecnico'
    user?: {
        id: string
        firstName: string
        lastName: string
        email: string
        profileImage?: string
    }
}

export interface WorkRoute {
    id: string
    activityId: string
    technicianId: string
    assignedVeredas: string[] // JSON parsed array
    farmsCount: number
    farmersCount: number
    mapRoute?: any // JSON for route path on map
    technician?: {
        id: string
        firstName: string
        lastName: string
        email: string
    }
}

export interface CreateProjectRequest {
    name: string
    description: string
    location: string
    imageUrl?: string
    state: string
    startDate?: string
    endDate?: string
    companyId: string
    managerId: string
}

export interface UpdateProjectRequest {
    name?: string
    description?: string
    location?: string
    imageUrl?: string
    state?: string
    startDate?: string
    endDate?: string
}

export interface CreateWorkZoneRequest {
    projectId: string
    name: string
    municipality: string
    department: string
    veredas: string[]
    mapCoordinates?: any
}

export interface CreateProjectTeamMemberRequest {
    projectId: string
    userId: string
    role: string
}

export interface CreateWorkRouteRequest {
    activityId: string
    technicianId: string
    assignedVeredas: string[]
    farmsCount: number
    farmersCount: number
    mapRoute?: any
}
