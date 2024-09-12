import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AuthForm from '../components/AuthForm';
import signinBackground from '../assets/singin.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Şifre eşleşme kontrolü
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      alert('You must accept the terms and conditions.');
      return;
    }

    try {
      // Firebase'de kullanıcı oluşturma
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User created successfully');
      navigate('/'); // Kayıt başarılı olursa ana sayfaya yönlendiriyoe
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error signing up. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-white font-ubuntu bg-cover bg-center"
      style={{
        backgroundImage: `url(${signinBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
      }}
    >
      <AuthForm>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-white mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-500 focus:border-pink-500 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="form-checkbox text-pink-500 border-pink-500 focus:ring-pink-500 focus:ring-opacity-50"
              required
            />
            <span className="ml-2 text-white">
              I agree to the <Link to="/privacy-policy" className="text-pink-500">Privacy policy</Link>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-pink text-white py-2 rounded-md shadow-custom-pink transition-all duration-500 hover:brightness-125 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-white">Already have an account?</span>
          <Link to="/signin" className="text-pink-500 ml-2">Sign in!</Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default SignUp;
