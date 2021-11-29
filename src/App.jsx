import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import NotFound from "./pages/404/NotFound";

import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            {!user && (
              <Route path="/" element={<Navigate replace to="/login" />} />
            )}
            {user && <Route path="/" element={<Home />} />}

            {!user && <Route path="/signup" element={<Signup />} />}
            {user && (
              <Route path="/signup" element={<Navigate replace to="/" />} />
            )}

            {!user && <Route path="/login" element={<Login />} />}
            {user && (
              <Route path="/login" element={<Navigate replace to="/" />} />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
