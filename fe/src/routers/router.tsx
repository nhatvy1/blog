import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Action, Modules } from '@/utils/constant'
import ErrorPage from '@/pages/error/ErrorPage'
import NotAccessPage from '@/pages/not-access-page/NotAccessPage'
const RoleManageMentPage = lazy(()=> import('@/pages/role-management/RoleManagementPage'))
const AuthorizationRoute = lazy(()=> import('@/providers/AuthorizationRoute'))
const Layout = lazy(() => import('@/components/layout/Layout'))
const LoginRoute = lazy(() => import('@/providers/LoginRoute'))
const Authentication = lazy(() => import('@/providers/AuthenticationRoute'))
const LoginPage = lazy(() => import('@/pages/login/LoginPage'))
const SkeletonPage = lazy(() => import('@/components/skeleton/SkeletonPage'))
const UserManagementPage = lazy(
  () => import('@/pages/user-management/UserManagementPage')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<SkeletonPage />}>
        <Authentication>
          <Layout />
        </Authentication>
      </Suspense>
    ),
    children: [
      {
        path: '/user-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <AuthorizationRoute module={Modules.USER} permission={Action.READ}>
              <UserManagementPage />
            </AuthorizationRoute>
          </Suspense>
        )
      },
      {
        path: '/role-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <AuthorizationRoute module={Modules.ROLE} permission={Action.READ}>
              <RoleManageMentPage />
            </AuthorizationRoute>
          </Suspense>
        )
      },
      {
        path: '/not-allowed-to-access-this-page',
        element: <NotAccessPage />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<SkeletonPage />}>
        <LoginRoute>
          <LoginPage />
        </LoginRoute>
      </Suspense>
    )
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<SkeletonPage />}>
        <LoginRoute>
          <LoginPage />
        </LoginRoute>
      </Suspense>
    )
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

export default router
