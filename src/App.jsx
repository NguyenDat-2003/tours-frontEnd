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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '/find-tour', element: <Tours /> },
        { path: '/enterprise', element: <Users /> },
        { path: '/blog', element: <Blogs /> },
        { path: '/login', element: <LogIn /> },
        { path: '/register', element: <Register /> }
      ]
    },
    {
      path: '/',
      element: <RequireLayout />,
      children: [{ path: '/profile', element: <Profile /> }]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
