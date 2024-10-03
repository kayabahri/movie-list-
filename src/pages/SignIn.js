import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AuthForm from '../components/AuthForm';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Giriş başarılı!');
      navigate('/');
    } catch (err) {
      setError('Giriş başarısız: ' + err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(/path/to/your/background-image.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
      }}
    >
      <AuthForm>
        <form onSubmit={handleSubmit} className="space-y-4 font-ubuntu text-left">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox text-pink-500 border-pink-500 focus:ring-pink-500 focus:ring-opacity-50"
              />
              <span className="ml-2 text-white">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-pink-500">Forgot password?</Link>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-pink text-white py-2 rounded-lg shadow-custom-pink transition-all duration-500 hover:brightness-125 hover:shadow-lg"
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-white">Don't have an account?</span>
          <Link to="/signup" className="text-pink-500 ml-2">Sign up!</Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default SignIn;
