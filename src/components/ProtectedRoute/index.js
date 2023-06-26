import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  console.log(props)
  
  const token = Cookies.get('jwt_token')
  console.log("protectedroute:",token)
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute