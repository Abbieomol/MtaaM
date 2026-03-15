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

import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>

        {/* Navbar appears on all pages */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>

      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;