import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjectContext'
import { TutorProvider } from './context/TutorContext'
import { TituladoProvider } from './context/TituladoContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoadingScreen from './components/layout/LoadingScreen'

const Layout = lazy(() => import('./components/layout/Layout'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const ProjectsList = lazy(() => import('./pages/admin/ProjectsList'))
const CreateEditProject = lazy(
  () => import('./pages/admin/CreateEditProject'),
)
const ProjectDetail = lazy(() => import('./pages/admin/ProjectDetail'))
const TituladosList = lazy(() => import('./pages/admin/TituladosList'))
const CreateEditTitulado = lazy(() => import('./pages/admin/CreateEditTitulado'))
const TutorsList = lazy(() => import('./pages/admin/TutorsList'))
const CreateEditTutor = lazy(() => import('./pages/admin/CreateEditTutor'))
const AuditLogs = lazy(() => import('./pages/admin/AuditLogs'))
const UserProject = lazy(() => import('./pages/user/UserProject'))
const UserProfile = lazy(() => import('./pages/user/UserProfile'))
const HomePage = lazy(() => import('./pages/HomePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export function App() {
  return (
    <AuthProvider>
      <TituladoProvider>
        <TutorProvider>
          <ProjectProvider>
            <Router>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute role="admin">
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="projects" element={<ProjectsList />} />
                    <Route
                      path="projects/create"
                      element={<CreateEditProject />}
                    />
                    <Route path="projects/:id" element={<ProjectDetail />} />
                    <Route
                      path="projects/:id/edit"
                      element={<CreateEditProject />}
                    />
                    
                    
                    <Route path="titulados" element={<TituladosList />} />
                    <Route path="titulados/create" element={<CreateEditTitulado />} />
                    <Route path="titulados/:id/edit" element={<CreateEditTitulado />} />

                    <Route path="tutors" element={<TutorsList />} />
                    <Route
                      path="tutors/create"
                      element={<CreateEditTutor />}
                    />
                    <Route
                      path="tutors/:id/edit"
                      element={<CreateEditTutor />}
                    />
                    <Route path="audit" element={<AuditLogs />} />
                  </Route>

                  <Route
                    path="/user"
                    element={
                      <ProtectedRoute role="user">
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<UserProject />} />
                    <Route path="profile" element={<UserProfile />} />
                  </Route>

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Router>
          </ProjectProvider>
        </TutorProvider>
      </TituladoProvider>
    </AuthProvider>
  )
}