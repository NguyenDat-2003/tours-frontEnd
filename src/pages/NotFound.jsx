import { useRouteError } from 'react-router-dom'

export default function NotFound() {
  const error = useRouteError()

  return (
    <div id='error-page' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1 style={{ color: 'red' }}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
