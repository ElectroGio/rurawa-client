export interface Group {
    id: string
    name: string
    description?: string
    companyId: string
    userCount: number
    createdAt: string
}

export interface GroupWithUsers extends Group {
    users: GroupUser[]
}

export interface GroupUser {
    id: string
    firstName: string
    lastName: string
    email: string
}

export interface CreateGroupRequest {
    name: string
    description?: string
    companyId: string
}

export interface UpdateGroupRequest {
    name?: string
    description?: string
}
