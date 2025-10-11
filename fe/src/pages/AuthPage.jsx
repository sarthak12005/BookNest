import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;



export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleLoginSubmit = async (data) => {
        try {
            const { email, password } = data;

            const res = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });

            if (res.status === 200) {
                toast.success("login Successfully");
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }

        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    }

    const handleRegisterSubmit = async (data) => {
        try {
            const { name, email, password, username } = data;

            const res = await axios.post(`${API_URL}/auth/signup`, {
                fullName: name,
                email,
                username,
                password
            });

            if (res.status === 200) {
                toast.success("Registration successful! Please Login");
                setActiveTab('login');
            }

        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        }
    }


    const handleSubmit = () => {
        if (activeTab === 'login') {
            handleLoginSubmit(formData);
        } else {
            handleRegisterSubmit(formData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  flex justify-center items-center px-4 py-8 selection:bg-red-400">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white">

                {/* LEFT SIDE - FORM SECTION */}
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col justify-center items-center py-12 px-6 sm:px-10">
                    {/* Tabs */}
                    <div className="w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-xl flex p-1 mb-8">
                        <button
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'login'
                                ? 'bg-white text-blue-600 shadow-lg'
                                : 'text-black hover:bg-white/10'
                                }`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'register'
                                ? 'bg-white text-blue-600 shadow-lg'
                                : 'text-black hover:bg-white/10'
                                }`}
                            onClick={() => setActiveTab('register')}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form Card */}
                    <div className="w-full max-w-sm bg-white py-8 px-8 rounded-2xl shadow-xl">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {activeTab === 'login'
                                    ? 'Enter your credentials to access your account'
                                    : 'Sign up to get started with your account'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Name Field (Register only) */}
                            {activeTab === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* username field */}
                            {activeTab === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    {activeTab === 'login' && (
                                        <button
                                            type="button"
                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me (Login only) */}
                            {activeTab === 'login' && (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                        Remember me for 30 days
                                    </label>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-3 text-xs text-gray-500">Or continue with</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>
                            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                                <svg className="w-5 h-5" fill="#181717" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </button>
                        </div>

                        {/* Toggle Link */}
                        <p className="text-sm text-gray-600 text-center mt-6">
                            {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                type="button"
                                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - IMAGE SECTION */}
                <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-end justify-center p-10" style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80')",
                }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    <div className="relative z-10 text-center text-white max-w-md py-25">
                        {/* <div className="w-48 h-48 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div> */}
                        <h3 className="text-2xl font-bold mb-3">
                            Secure & Simple Authentication
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Join thousands of users who trust our platform for secure access to their accounts. Get started in seconds with email or social login.
                        </p>
                        <div className="mt-8 flex justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}