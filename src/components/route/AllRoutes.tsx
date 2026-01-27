import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthorityGuard from './AuthorityGuard'
import AppRoute from './AppRoute'
import PageContainer from '@/components/template/PageContainer'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import ResourceModule from '@/views/modules/resource/ResourceModule'
import Proyectos from '@/views/modules/resource/components/ResouceProyectsPage'
import QuestionnairesView from '@/views/modules/questionnaires/QuestionnairesView'
import QuestionnaireDetailView from '@/views/modules/questionnaires/QuestionnaireDetailView'
import EditQuestionnaireView from '@/views/modules/questionnaires/EditQuestionnaireView'
import RespondQuestionnaireView from '@/views/modules/questionnaires/RespondQuestionnaireView'
import QuestionnaireResponsesView from '@/views/modules/questionnaires/QuestionnaireResponsesView'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props: AllRoutesProps) => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={<Navigate replace to={authenticatedEntryPath} />}
                />
                {protectedRoutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <AuthorityGuard
                                userAuthority={user.authority}
                                authority={route.authority}
                            >
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>

            <Route path="/" element={<ResourceModule />} />

            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/app/questionnaires" element={<QuestionnairesView />} />
            <Route path="/app/questionnaires/:id" element={<QuestionnaireDetailView />} />
            <Route path="/app/questionnaires/:id/edit" element={<EditQuestionnaireView />} />
            <Route path="/app/questionnaires/:id/respond" element={<RespondQuestionnaireView />} />
            <Route path="/app/questionnaires/:id/responses" element={<QuestionnaireResponsesView />} />
        </Routes>
    )
}

export default AllRoutes
