import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import './styleess.scss'
import UserDetail from './pages/UserDetail';
// import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './pages/Footer';
import DoctorAppointment from './pages/DoctorAppoint';

function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/docters" exact element={<DoctorAppointment />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile/:id' element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
