import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAdminAuth()
  if (!isAuth) return <Navigate to="/admin-login" replace />
  return <>{children}</>
}
