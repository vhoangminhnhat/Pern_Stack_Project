import { Redirect, Route } from "react-router-dom";
import Main from "./Main";

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem("neci-cms-token");

  if (!token) return <Redirect to="/login" />;

  return (
    <Route {...rest} render={(props) => <Main {...props}>{children}</Main>} />
  );
}

export default PrivateRoute;
