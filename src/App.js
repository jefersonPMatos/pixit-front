import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Theme } from "./styles/theme";
import { Reset } from "./styles/reset";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./Contexts/AuthContext";

import { ProtectedRoutes } from "./middleware/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Reset />
      <Theme />
    </AuthProvider>
  );
}

export default App;
