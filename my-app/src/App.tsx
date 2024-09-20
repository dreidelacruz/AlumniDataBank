import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AlumniHomePage from "./pages/alumniPage/AlumniHomePage";
import Policy from "./pages/alumniPage/Policy";
import AdminDashboard from "./pages/adminPage/AdminDashboard";
import AlumniData from "./pages/adminPage/AlumniData";
import RegisterPage from "./pages/RegisterPage";
import AlumniProfilePage from "./pages/alumniPage/AlumniProfilePage";
import { UserPhotoProvider } from "./contexts/UserPhotoContext";
import EmailConfirmationPage from "./pages/alumniPage/EmailConfirmationPage";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <UserPhotoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/tracer-system" />} />
          <Route path="/tracer-system" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm-email" element={<EmailConfirmationPage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/alumni-home" element={<AlumniHomePage />} />
          <Route path="/alumni-profile/:id" element={<AlumniProfilePage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/alumni-records" element={<AlumniData />} />
          <Route path="*" element={<Navigate to="/tracer-system" />} />
        </Routes>
      </BrowserRouter>
    </UserPhotoProvider>
  );
}

export default App;
