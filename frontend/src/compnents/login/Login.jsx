import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(getApiUrl('/login'), { username, password });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenUser', response.data.user.username);
      navigate(`/`);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B2735] via-[#090E17] to-[#0D1117] relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-[#0D1117] bg-opacity-90 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
          <div className="bg-[#1B2735] rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full border border-[#304C89]">
            <div className="bg-red-900/30 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 backdrop-blur-sm">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-800/50 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V7a1 1 0 112 0v3a1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-[#A5B4FC]">Error</h3>
                  <div className="mt-2">
                    <p className="text-sm text-[#A5B4FC]">{error}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1B2735] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-[#304C89]">
              <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-[#304C89] shadow-sm px-4 py-2 bg-red-900/30 text-base font-medium text-[#A5B4FC] hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm backdrop-blur-sm transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-screen mt-32 relative z-10">
        <div className="max-w-md mx-auto bg-[#1B2735] rounded-lg overflow-hidden shadow-xl border border-[#304C89] backdrop-blur-sm">
          <div className="px-6 py-4 bg-gradient-to-r from-[#1B2735] to-[#304C89]">
            <h2 className="text-2xl font-bold text-[#A5B4FC] mb-2 text-center">Sign in to your account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#A5B4FC] text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="appearance-none border border-[#304C89] rounded w-full py-2 px-3 text-[#A5B4FC] bg-[#141E33] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#818CF8] transition-all"
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#A5B4FC] text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="appearance-none border border-[#304C89] rounded w-full py-2 px-3 text-[#A5B4FC] bg-[#141E33] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#818CF8] transition-all"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gradient-to-r from-[#304C89] to-[#818CF8] hover:from-[#3a5ca3] hover:to-[#8e97f9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="px-6 py-4 bg-[#1B2735] border-t border-[#304C89]">
            <p className="text-center text-sm text-[#A5B4FC]">
              Not a member?{' '}
              <a href="/signup" className="font-semibold text-[#818CF8] hover:text-[#A5B4FC] transition-colors">
                Signup Now
              </a>
            </p>
            <p className="text-center text-sm text-[#A5B4FC] mt-2">
              Go back to Homepage?{' '}
              <a href="/" className="font-semibold text-[#818CF8] hover:text-[#A5B4FC] transition-colors">
                Go back
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
