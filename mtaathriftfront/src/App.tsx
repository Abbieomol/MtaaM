import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";

import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Vendor from "./pages/Vendor";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";


function App() {
  const storedUser = localStorage.getItem("user");
  const user: user | null = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

       
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search user={user!} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

     
          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Customer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <Vendor user={user!} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;