import RequireLayout from '~/layout/RequireLayout'
import DefaultLayout from '~/layout/DefaultLayout'
import LogIn from '~/pages/Auth/LogIn'
import Register from '~/pages/Auth/Register'
import Blogs from '~/pages/Blogs'
import Profile from '~/pages/Profile'
import Tours from '~/pages/Tours'
import Users from '~/pages/Users'

export const nav = [
  { path: '/', element: Tours, layout: DefaultLayout },
  { path: '/find-tour', element: Tours, layout: DefaultLayout },
  { path: '/enterprise', element: Users, layout: DefaultLayout },
  { path: '/blog', element: Blogs, layout: DefaultLayout },
  { path: '/login', element: LogIn, layout: DefaultLayout },
  { path: '/register', element: Register, layout: DefaultLayout },

  { path: '/profile', element: Profile, layout: RequireLayout }
]
