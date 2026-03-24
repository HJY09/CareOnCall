import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import './styleess.scss'
import DateSelect from './pages/DateSelect';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './pages/Footer';
import DoctorAppointment from './pages/DoctorAppoint';
import ProtectedRoute from './pages/ProtectedRoute';

// SECURITY: All routes that require authentication are wrapped in
// <ProtectedRoute> which redirects unauthenticated users to /login.
// This prevents direct URL access to protected pages without a valid token.
function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/docters" element={
            <ProtectedRoute>
              <DoctorAppointment />
            </ProtectedRoute>
          } />
          <Route path="/profile/:id" element={
            <ProtectedRoute>
              <DateSelect />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;