import { Outlet, useNavigate } from 'react-router-dom'
import useAuthStatus from "../hooks/useAuthStatus"


// Here, you can use userInfo’s value to detect if a user is logged in.
// If userInfo is absent, an unauthorized template is returned.
// Otherwise, we use React Router’s Outlet component to render the child routes

// const user = JSON.parse(localStorage.getItem("user"));

const ProtectedRoute = () => {
  // const { userInfo } = useSelector((state) => state.user || {})
  const navigate = useNavigate();
  const [isLoggedIn, isLoading] = useAuthStatus();
  // show unauthorized screen if no user is found in redux store

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  // if (!isLoggedIn) {
  //   return (
  //     <div className='unauthorized'>
  //       <h1>Unauthorized :</h1>
  //       <span>
  //         <NavLink to='/users/login'>Login</NavLink> to gain access
  //       </span>
  //     </div>
  //   )
  // }

  // returns child route elements
  return isLoggedIn ? <Outlet /> : navigate('/users/login')
}
export default ProtectedRoute
