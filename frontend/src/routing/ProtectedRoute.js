import { Outlet, useNavigate } from 'react-router-dom'
import useAuthStatus from "../hooks/useAuthStatus"
import { useSelector } from "react-redux";


// Here, you can use userInfo’s value to detect if a user is logged in.
// If userInfo is absent, an unauthorized template is returned.
// Otherwise, we use React Router’s Outlet component to render the child routes

// const user = JSON.parse(localStorage.getItem("user"));

const ProtectedRoute = () => {
  // const { userInfo } = useSelector((state) => state.user || {})
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoggedIn, isLoading] = useAuthStatus();
  // show unauthorized screen if no user is found in redux store

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  // returns child route elements
  return isLoggedIn ? <Outlet /> : navigate('/users/login')
}
export default ProtectedRoute
