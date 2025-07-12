// App.tsx
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CalendarView from './Components/Calendar/CalendarView';
import Login from './Components/Login/LoginPage'
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
