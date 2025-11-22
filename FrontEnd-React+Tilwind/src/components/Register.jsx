import React, { useContext, useEffect, useState } from "react";
import useRegister from "../customHooks/registerHooks";
import useRequest from "../customHooks/RequestHook";
import { uiContext } from "../customContexts/UiContext";
const Register = () => {
  const [resendIn,setResendIn] = useState(30);
  const [unverifiedEmail,setUnverifiedEmail] = useState('')
  const [redirectUrl,setRedirectUrl] = useState('') ;
  const {sendRequest}  = useRequest();
  const [logindetails,setLoginDetails] = useState({
    email : unverifiedEmail, // optional for incomplate registration
    username_field:'',
    password:'',
    otp:''
  })
  const [registerDetails,setRegisterDetails] = useState({
    email:'',
    phone_number :'',
    firstName:'',
    lastName:'',
    password:"",
    password2:'',
    refarrel_code :'',
    otp:"",
  })
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSentReg, setVerificationSentReg] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {setSuccess} = useContext(uiContext);

  const getRetriveFunc = (data) => {
    setSuccess(data.success);
  }
  const resendOtp = () => {
    let deta = activeTab === 'login'? logindetails : {
      username_field: registerDetails?.email,
      password:registerDetails?.password
    }
    retriveOtp("/authuser/resend-otp/",deta,getRetriveFunc,)
  }

  useEffect(() => {
    // if (verificationSent || verificationSentReg){
      if(resendIn > 0 ){
        setTimeout(() => {
          setResendIn(resendIn - 1)
        }, 1000);
      }
    // }
  },
  [verificationSent,verificationSentReg,resendIn])

  // custom hooks config 
  const {login,register,completeRegisterAccount,retriveOtp} = useRegister(setVerificationSent,setVerificationSentReg,setRedirectUrl,setUnverifiedEmail);
  
  const handleLogin = () => {
    if (logindetails.username_field && logindetails.password.length >= 8) {
      login(logindetails,'/authuser/loginRequest/');
    }
  }
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const params = {
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        redirect_uri: `${window.location.origin}/auth/google/callback`,
        response_type: "code",
        scope: "email profile",
        access_type: "offline",
        prompt: "consent",
      };
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const authUrl = `${googleAuthUrl}?${queryString}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowForm = (tab) => {
    setActiveTab(tab);
    setShowForm(true);
  };
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-blue-600 pb-12 relative "
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20fintech%20abstract%20background%20with%20soft%20blue%20gradient%20and%20subtle%20geometric%20patterns%2C%20financial%20technology%20concept%20with%20flowing%20digital%20elements%2C%20clean%20professional%20design%20with%20light%20particle%20effects&width=1440&height=1024&seq=1&orientation=landscape')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className=" sticky z-40 top-0 w-full px-8 py-2  mb-4 flex justify-between items-center bg-blue-900 bg-opacity-90  backdrop-blur-md">
        <div className="flex items-center">
          <i className="fas fa-shield-alt text-white text-3xl mr-3"></i>
          <h1 className="text-2xl font-bold text-white">App </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => handleShowForm("login")}
            className="  bg-white text-blue-600 bg-opacity-20 hover:bg-blue-400 hover:text-white  px-6 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap !rounded-button"
          >
            Login
          </button>
          <button
            onClick={() => handleShowForm("register")}
            className="bg-blue-400  hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap !rounded-button"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="text-center">
        Register Page and login 
      </div>
    </div>
  );
};
export default Register;
