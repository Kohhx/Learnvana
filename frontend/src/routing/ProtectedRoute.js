import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

// Here, you can use userInfo’s value to detect if a user is logged in.
// If userInfo is absent, an unauthorized template is returned.
// Otherwise, we use React Router’s Outlet component to render the child routes

const user = JSON.parse(localStorage.getItem("user"));

const ProtectedRoute = () => {
  // const { userInfo } = useSelector((state) => state.user || {})

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized :</h1>
        <span>
          <NavLink to='/users/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute
