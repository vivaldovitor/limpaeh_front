import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './components/view/SignIn';
import Dashboard from './pages/Dashboard';
import theme from './styles/GlobalTheme';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import SignUp from './components/view/SignUp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>} />
            
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
