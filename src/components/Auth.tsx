import React, { useState } from 'react';

interface User {
  username: string;
  password?: string; // Password is not always sent back
  favorites?: number[];
}

interface AuthProps {
  onAuthSuccess: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = storedUsers.find((u: User) => u.username === username);

    if (existingUser) {
      setError('Username already exists. Please choose another one.');
      return;
    }

    const newUser: User = { username, password, favorites: [] };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Automatically log in the user after signing up
    const { password: _, ...userToReturn } = newUser;
    onAuthSuccess(userToReturn);
  };

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: User) => u.username === username && u.password === password);

    if (user) {
      const { password: _, ...userToReturn } = user;
      onAuthSuccess(userToReturn);
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-2xl">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-red-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-yellow-500 hover:underline ml-1">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth; 