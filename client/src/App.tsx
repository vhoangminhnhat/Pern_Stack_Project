import Navigations from "navigations/Navigations";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginFeature from "features/loginFeature/views/LoginFeature";
import NotFoundFeature from "features/notFoundFeature/views/NotFoundFeature";

function App() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<LoginFeature />} />
          {Navigations?.appPages?.map((item) => {
            return <Route path={item?.path} element={item?.component} />;
          })}
          <Route path="/404" element={<NotFoundFeature />} />
          <Navigate to="/404" />
        </Routes>
      </div>
    </>
  );
}

export default App;
