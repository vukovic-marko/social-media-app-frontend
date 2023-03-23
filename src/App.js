import { Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeLayout } from './layouts/HomeLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import OtherUserPage from './pages/OtherUserPage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<LoginPage mode="login"/>} />
          <Route path="/register" element={<LoginPage mode="registration" />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<OtherUserPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:username" element={<SearchPage />} />
        </Route>

        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
