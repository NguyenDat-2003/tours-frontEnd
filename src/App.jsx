import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import { nav } from '~/routes/AppRoutes'

function App() {
  return (
    <Routes>
      {nav.map((route, index) => {
        const Layout = route.layout || Fragment
        const Page = route.element
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        )
      })}
    </Routes>
  )
}

export default App
