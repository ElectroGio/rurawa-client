export enum QuestionType {
    ShortAnswer = 1,
    LongAnswer = 2,
    SingleChoice = 3,
    MultipleChoice = 4,
    Dropdown = 5,
    LinearScale = 6,
    Rating = 7,
    Date = 8,
    Time = 9,
    FileUpload = 10,
}

export interface QuestionOption {
    id?: string
    optionText: string
    order: number
    isCorrect: boolean
}

export interface Question {
    id?: string
    questionText: string
    description?: string
    type: QuestionType
    order: number
    isRequired: boolean
    minScale?: number
    maxScale?: number
    minScaleLabel?: string
    maxScaleLabel?: string
    maxRating?: number
    points?: number
    options: QuestionOption[]
}

export interface Questionnaire {
    id: string
    title: string
    description?: string
    companyId: string
    createdByUserId: string
    createdByUserName: string
    isTemplate: boolean
    isActive: boolean
    questionCount: number
    responseCount: number
    createdAt: string
    updatedAt?: string
}

export interface QuestionnaireDetail {
    id: string
    title: string
    description?: string
    companyId: string
    createdByUserId: string
    createdByUserName: string
    allowResponseEditing: boolean
    disableAutoSave: boolean
    limitToOneResponse: boolean
    showProgressInRealTime: boolean
    randomizeQuestionOrder: boolean
    requireValidationDateTime: boolean
    requireLocation: boolean
    requirePhotoUpload: boolean
    requireTrainerSignature: boolean
    generateParticipantList: boolean
    allowEditAfterSubmission: boolean
    sendResponseCopyToParticipants: boolean
    isTemplate: boolean
    isActive: boolean
    questions: Question[]
    createdAt: string
    updatedAt?: string
}

export interface CreateQuestionnaireRequest {
    title: string
    description?: string
    isTemplate: boolean
    questions: CreateQuestionRequest[]
    allowResponseEditing: boolean
    disableAutoSave: boolean
    limitToOneResponse: boolean
    showProgressInRealTime: boolean
    randomizeQuestionOrder: boolean
    requireValidationDateTime: boolean
    requireLocation: boolean
    requirePhotoUpload: boolean
    requireTrainerSignature: boolean
    generateParticipantList: boolean
    allowEditAfterSubmission: boolean
    sendResponseCopyToParticipants: boolean
}

export interface CreateQuestionRequest {
    questionText: string
    description?: string
    type: QuestionType
    order: number
    isRequired: boolean
    points?: number
    minScale?: number
    maxScale?: number
    minScaleLabel?: string
    maxScaleLabel?: string
    maxRating?: number
    options: CreateQuestionOptionRequest[]
}

export interface CreateQuestionOptionRequest {
    optionText: string
    order: number
    isCorrect: boolean
}

export interface UpdateQuestionnaireRequest {
    title: string
    description?: string
    questions: UpdateQuestionRequest[]
    allowResponseEditing: boolean
    disableAutoSave: boolean
    limitToOneResponse: boolean
    showProgressInRealTime: boolean
    randomizeQuestionOrder: boolean
    requireValidationDateTime: boolean
    requireLocation: boolean
    requirePhotoUpload: boolean
    requireTrainerSignature: boolean
    generateParticipantList: boolean
    allowEditAfterSubmission: boolean
    sendResponseCopyToParticipants: boolean
}

export interface UpdateQuestionRequest {
    id?: string
    questionText: string
    description?: string
    type: QuestionType
    order: number
    isRequired: boolean
    points?: number
    minScale?: number
    maxScale?: number
    minScaleLabel?: string
    maxScaleLabel?: string
    maxRating?: number
    options: UpdateQuestionOptionRequest[]
}

export interface UpdateQuestionOptionRequest {
    id?: string
    optionText: string
    order: number
    isCorrect: boolean
}

export interface SubmitAnswer {
    questionId: string
    textAnswer?: string
    selectedOptionId?: string
    multipleOptionIds?: string[]
    numericAnswer?: number
    dateTimeAnswer?: string
    fileUrl?: string
}

export interface SubmitQuestionnaireResponse {
    questionnaireId: string
    answers: SubmitAnswer[]
    validationDateTime?: string
    location?: string
    latitude?: number
    longitude?: number
    photoUrl?: string
    trainerSignatureUrl?: string
}

export interface QuestionnaireResponseSummary {
    id: string
    questionnaireId: string
    questionnaireTitle: string
    respondentUserId: string
    respondentUserName: string
    startedAt: string
    completedAt?: string
    isCompleted: boolean
    totalScore?: number
    maxPossibleScore?: number
    location?: string
    createdAt: string
}
