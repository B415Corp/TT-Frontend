import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export const PrivateRoute = (props: { children: React.ReactNode }) => {
  const isAuthenticated = CheckIsLogin();

  if (isAuthenticated) {
    return props.children;
  }

  return <Navigate to="/login" />;
};

function CheckIsLogin() {
  var data = Cookies.get("Token");
  if (data && data != undefined) {
    return true;
  } else {
    return false;
  }
}
