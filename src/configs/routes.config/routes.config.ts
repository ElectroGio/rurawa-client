import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'usuarios',
        path: '/usuarios',
        component: lazy(() => import('@/views/modules/users/UsersView')),
        authority: [],
    },
    {
        key: 'usuarios',
        path: '/usuarios/perfil/:id',
        component: lazy(() => import('@/views/modules/users/profile/ProfileUser')),
        authority: [],
    },
    {
        key: 'usuarios',
        path: '/usuarios/perfil/configuracion/:id',
        component: lazy(() => import('@/views/modules/users/profile/ConfigProfile')),
        authority: [],
    },
    {
        key: 'agricultores',
        path: '/agricultores',
        component: lazy(() => import('@/views/modules/farmer/FarmerModulesView')),
        authority: [],
    },
    {
        key: 'recursos',
        path: '/recursos',
        component: lazy(() => import('@/views/modules/resource/ResourceModule')),
        authority: [],
    },
    {
        key: 'projects',
        path: '/proyectos',
        component: lazy(() => import('@/views/modules/projects/Projects')),
        authority: [],
    },
    {
        key: 'projects/activities',
        path: '/proyectos/:code',
        component: lazy(() => import('@/views/modules/projects/Activities')),
        authority: [],
    },
    {
        key: 'recursos',
        path: '/recursos',
        component: lazy(() => import('@/views/modules/resource/ResourceModule')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
    ...othersRoute,
]
