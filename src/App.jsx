import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Tours from './pages/Tours'
import Users from './pages/Users'
import Blogs from './pages/Blogs'
import LogIn from './pages/Auth/LogIn'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile'
import NotFound from '~/pages/NotFound'
import RequireLayout from './layout/RequireLayout'
import AdminLayout from './layout/AdminLayout'
import AdminTours from './pages/Admin/Tours/AdminTours'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '/find-tour', element: <Tours /> },
        { path: '/enterprise', element: <Tours /> },
        { path: '/blog', element: <Blogs /> },
        { path: '/login', element: <LogIn /> },
        { path: '/register', element: <Register /> }
      ]
    },
    {
      path: '/',
      element: <RequireLayout />,
      children: [{ path: '/profile', element: <Profile /> }]
    },
    {
      path: '/',
      element: <AdminLayout />,
      children: [
        { path: 'admin/tours', element: <AdminTours /> },
        { path: 'admin/users', element: <Users /> },
        { path: 'admin/bookings', element: <Users /> },
        { path: 'admin/reviews', element: <Users /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
