export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    countryCode: string
    dateOfBirth: string
    bloodType: string
    city: string
    profession: string
    state: string
    companyId: string
    isActive: boolean
}

export interface CreateUserRequest {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    countryCode: string
    dateOfBirth: string
    bloodType: string
    city: string
    profession: string
    state: string
    companyId: string
    password: string
}

export interface UpdateUserRequest {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    countryCode?: string
    dateOfBirth?: string
    bloodType?: string
    city?: string
    profession?: string
    state?: string
}

export interface PaginatedResponse<T> {
    items: T[]
    pageNumber: number
    pageSize: number
    totalPages: number
    totalCount: number
}
