export interface Activity {
    id: string
    title: string
    description?: string
    startDate: string
    endDate?: string
    status: string
    priority: string
    projectId: string
    companyId: string
    createdAt: string
}

export interface ActivityWithUsers extends Activity {
    assignedUsers: ActivityUser[]
}

export interface ActivityUser {
    id: string
    firstName: string
    lastName: string
    email: string
}

export interface CreateActivityRequest {
    title: string
    description?: string
    startDate: string
    endDate?: string
    status: string
    priority: string
    projectId: string
}

export interface UpdateActivityRequest {
    title?: string
    description?: string
    startDate?: string
    endDate?: string
    status?: string
    priority?: string
}
