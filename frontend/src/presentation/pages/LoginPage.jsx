import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth.js';
import Popup from '../components/Popup.jsx';
import { TEInput, TERipple } from "tw-elements-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [isFocused, setIsFocused] = useState({ login: false, password: false });

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.login || !formData.password) {
      setPopupData({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all fields.'
      });
      setShowPopup(true);
      return;
    }

    const result = await login(formData.login, formData.password);
    
    if (result.success) {
      setPopupData({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome back! Redirecting to dashboard...'
      });
      setShowPopup(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setPopupData({
        type: 'error',
        title: 'Login Failed',
        message: result.error || 'An error occurred during login.'
      });
      setShowPopup(true);
    }
  };

  return (
    <section className="h-screen">
    <div className="h-full">
      {/* <!-- Left column container with background--> */}
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>

        {/* <!-- Right column container --> */}
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form>
           
           

            {/* <!-- Email input --> */}
            <TEInput
              type="email"
              label="Email address"
              size="lg"
              className="mb-6"
            ></TEInput>

            {/* <!--Password input--> */}
            <TEInput
              type="password"
              label="Password"
              className="mb-6"
              size="lg"
            ></TEInput>

            <div className="mb-6 flex items-center justify-between">
              {/* <!-- Remember me checkbox --> */}
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="exampleCheck2"
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck2"
                >
                  Remember me
                </label>
              </div>

              {/* <!--Forgot password link--> */}
              <a href="#!">Forgot password?</a>
            </div>

            {/* <!-- Login button --> */}
            <div className="text-center lg:text-left">
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Login
                </button>
              </TERipple>

              {/* <!-- Register link --> */}
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Don't have an account?{" "}
                <a
                  href="#!"
                  className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
    // <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    //   {/* Animated background elements */}
    //   <div className="absolute inset-0">
    //     <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
    //     <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    //     <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
    //   </div>

    //   {/* Floating particles */}
    //   <div className="absolute inset-0 overflow-hidden">
    //     {[...Array(20)].map((_, i) => (
    //       <div
    //         key={i}
    //         className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
    //         style={{
    //           left: `${Math.random() * 100}%`,
    //           top: `${Math.random() * 100}%`,
    //           animationDelay: `${Math.random() * 3}s`,
    //           animationDuration: `${3 + Math.random() * 2}s`
    //         }}
    //       />
    //     ))}
    //   </div>

    //   <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    //     <div className="w-full max-w-md">
    //       {/* Glassmorphism card */}
    //       <div className="relative group">
    //         {/* Card glow effect */}
    //         <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
    //         <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
    //           {/* Header */}
    //           <div className="text-center mb-8">
    //             <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
    //               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
    //               <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg">
    //                 <SparklesIcon className="h-8 w-8 text-white" />
    //               </div>
    //             </div>
    //             <h2 className="text-3xl font-bold text-white mb-2">
    //               Welcome Back
    //             </h2>
    //             <p className="text-purple-200">
    //               Sign in to your account to continue
    //             </p>
    //           </div>
              
    //           {/* Form */}
    //           <form onSubmit={handleSubmit} className="space-y-6">
    //             {/* Login field */}
    //             <div className="relative group">
    //               <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.login ? 'opacity-100' : ''}`}></div>
    //               <div className="relative">
    //                 <input
    //                   id="login"
    //                   name="login"
    //                   type="text"
    //                   required
    //                   className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
    //                   placeholder="Enter your login"
    //                   value={formData.login}
    //                   onChange={handleInputChange}
    //                   onFocus={() => setIsFocused({ ...isFocused, login: true })}
    //                   onBlur={() => setIsFocused({ ...isFocused, login: false })}
    //                 />
    //                 <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
    //                   <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Password field */}
    //             <div className="relative group">
    //               <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300 ${isFocused.password ? 'opacity-100' : ''}`}></div>
    //               <div className="relative">
    //                 <input
    //                   id="password"
    //                   name="password"
    //                   type={showPassword ? 'text' : 'password'}
    //                   required
    //                   className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12"
    //                   placeholder="Enter your password"
    //                   value={formData.password}
    //                   onChange={handleInputChange}
    //                   onFocus={() => setIsFocused({ ...isFocused, password: true })}
    //                   onBlur={() => setIsFocused({ ...isFocused, password: false })}
    //                 />
    //                 <button
    //                   type="button"
    //                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-200 hover:text-white transition-colors duration-200"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 >
    //                   {showPassword ? (
    //                     <EyeSlashIcon className="h-5 w-5" />
    //                   ) : (
    //                     <EyeIcon className="h-5 w-5" />
    //                   )}
    //                 </button>
    //               </div>
    //             </div>

    //             {/* Submit button */}
    //             <button
    //               type="submit"
    //               disabled={loading}
    //               className="relative w-full group"
    //             >
    //               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
    //               <div className="relative flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
    //                 {loading ? (
    //                   <>
    //                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
    //                     Signing in...
    //                   </>
    //                 ) : (
    //                   <>
    //                     <span>Sign In</span>
    //                     <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
    //                   </>
    //                 )}
    //               </div>
    //             </button>
    //           </form>

    //           {/* Register link */}
    //           <div className="mt-8 text-center">
    //             <p className="text-purple-200">
    //               Don't have an account?{' '}
    //               <Link 
    //                 to="/register" 
    //                 className="font-semibold text-white hover:text-purple-300 transition-colors duration-200 underline decoration-purple-400 underline-offset-4 hover:decoration-purple-300"
    //               >
    //                 Create one now
    //               </Link>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <Popup
    //     isOpen={showPopup}
    //     onClose={() => setShowPopup(false)}
    //     type={popupData.type}
    //     title={popupData.title}
    //     message={popupData.message}
    //   />
    // </div>
  );
};

export default LoginPage; 