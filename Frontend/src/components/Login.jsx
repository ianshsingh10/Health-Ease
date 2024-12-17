import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle Forgot Password view

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      // Handle Forgot Password
      console.log('Reset password email sent to:', email);
    } else {
      // Handle Login or Sign Up based on isLogin
      console.log(isLogin ? 'Logging in with' : 'Signing up with', 'Email:', email, 'Password:', password);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{isForgotPassword ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Password Input (only show if not Forgot Password) */}
        {!isForgotPassword && (
          <div className="mb-6">
            <label className="block mb-1 text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {isForgotPassword ? 'Send Reset Link' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        {/* Toggle between Login/Sign Up/Forgot Password */}
        {!isForgotPassword && (
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>

            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Back to Login or Sign Up */}
        {isForgotPassword && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Back to {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
