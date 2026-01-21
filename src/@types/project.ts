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
