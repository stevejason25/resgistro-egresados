import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProjectsList from './pages/admin/ProjectsList'
import CreateEditProject from './pages/admin/CreateEditProject'
import ProjectDetail from './pages/admin/ProjectDetail'
import UsersList from './pages/admin/UsersList'
import CreateEditUser from './pages/admin/CreateEditUser'
import TutorsList from './pages/admin/TutorsList'
import CreateEditTutor from './pages/admin/CreateEditTutor'
import AuditLogs from './pages/admin/AuditLogs'
import UserProject from './pages/user/UserProject'
import UserProfile from './pages/user/UserProfile'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/auth/ProtectedRoute'


export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Admin Routes */}
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
            <Route path="projects/create" element={<CreateEditProject />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="projects/:id/edit" element={<CreateEditProject />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/create" element={<CreateEditUser />} />
            <Route path="users/:id/edit" element={<CreateEditUser />} />
            <Route path="tutors" element={<TutorsList />} />
            <Route path="tutors/create" element={<CreateEditTutor />} />
            <Route path="tutors/:id/edit" element={<CreateEditTutor />} />
            <Route path="audit" element={<AuditLogs />} />
          </Route>
          {/* User Routes */}
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
      </Router>
    </AuthProvider>
  )
}