export interface Activity {
    id: string
    name: string
    description: string
    type: string
    startDate: string
    endDate: string
    projectId: string
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
    name: string
    description: string
    type: string
    startDate: string
    endDate: string
    projectId: string
}

export interface UpdateActivityRequest {
    name?: string
    description?: string
    type?: string
    startDate?: string
    endDate?: string
}
