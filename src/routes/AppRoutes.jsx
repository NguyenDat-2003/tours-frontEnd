import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '~/layout/DefaultLayout'
import LogIn from '~/pages/Auth/LogIn'
import Register from '~/pages/Auth/Register'
import Blogs from '~/pages/Blogs'
import Tours from '~/pages/Tours'
import Users from '~/pages/Users'

function AppRoute() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <DefaultLayout>
              <Tours />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path='/find-tour'
          element={
            <DefaultLayout>
              <Tours />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path='/enterprise'
          element={
            <DefaultLayout>
              <Users />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path='/blog'
          element={
            <DefaultLayout>
              <Blogs />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path='/login'
          element={
            <DefaultLayout>
              <LogIn />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path='/register'
          element={
            <DefaultLayout>
              <Register />
            </DefaultLayout>
          }
        ></Route>

        <Route path='*' element></Route>
      </Routes>
    </>
  )
}

export default AppRoute
