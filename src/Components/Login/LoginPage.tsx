import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const hardcodedEmail = '1';
    const hardcodedPassword = '1';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      enqueueSnackbar('Successfully logged in', { variant: 'success' });
      navigate('/calendar');
    } else {
      enqueueSnackbar('Invalid Email or Password', { variant: 'error' });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input  type="password"  placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)}  required  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <button  type="submit"  className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">  Login</button>
      </form>
    </div>
  );
};

export default Login;
