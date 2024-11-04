import { Navigate, redirect as Redir } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  const token = localStorage.getItem("chat-token");

  if (!token) return <Navigate to={"/login"} />;

  // return (

  // )
};
