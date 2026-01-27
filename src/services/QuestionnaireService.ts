import ApiService from './ApiService'
import type {
    Questionnaire,
    QuestionnaireDetail,
    CreateQuestionnaireRequest,
    UpdateQuestionnaireRequest,
    SubmitQuestionnaireResponse,
    QuestionnaireResponseSummary,
} from '@/@types/questionnaire/questionnaire.types'

// ==================== Questionnaires ====================

export async function apiGetQuestionnaires(companyId: string) {
    return ApiService.fetchDataWithAxios<Questionnaire[]>({
        url: '/questionnaires',
        method: 'get',
        params: { companyId },
    })
}

export async function apiGetQuestionnaireById(id: string) {
    return ApiService.fetchDataWithAxios<QuestionnaireDetail>({
        url: `/questionnaires/${id}`,
        method: 'get',
    })
}

export async function apiCreateQuestionnaire(data: CreateQuestionnaireRequest) {
    return ApiService.fetchDataWithAxios<string>({
        url: '/questionnaires',
        method: 'post',
        data: data as any,
    })
}

export async function apiUpdateQuestionnaire(
    id: string,
    data: UpdateQuestionnaireRequest,
) {
    return ApiService.fetchDataWithAxios<void>({
        url: `/questionnaires/${id}`,
        method: 'put',
        data: data as any,
    })
}

export async function apiDeleteQuestionnaire(id: string) {
    return ApiService.fetchDataWithAxios<void>({
        url: `/questionnaires/${id}`,
        method: 'delete',
    })
}

export async function apiGetQuestionnaireResponses(questionnaireId: string) {
    return ApiService.fetchDataWithAxios<QuestionnaireResponseSummary[]>({
        url: `/questionnaires/${questionnaireId}/responses`,
        method: 'get',
    })
}

export async function apiSubmitQuestionnaireResponse(
    questionnaireId: string,
    data: SubmitQuestionnaireResponse,
) {
    return ApiService.fetchDataWithAxios<string>({
        url: `/questionnaires/${questionnaireId}/responses`,
        method: 'post',
        data: data as any,
    })
}

export async function apiGetQuestionnaireTemplates() {
    return ApiService.fetchDataWithAxios<Questionnaire[]>({
        url: '/questionnaires/templates',
        method: 'get',
    })
}

export async function apiExportQuestionnaireToExcel(questionnaireId: string) {
    return ApiService.fetchDataWithAxios<Blob>({
        url: `/questionnaires/${questionnaireId}/export?format=excel`,
        method: 'get',
        responseType: 'blob',
    })
}

export async function apiExportQuestionnaireToPdf(questionnaireId: string) {
    return ApiService.fetchDataWithAxios<Blob>({
        url: `/questionnaires/${questionnaireId}/export?format=pdf`,
        method: 'get',
        responseType: 'blob',
    })
}
