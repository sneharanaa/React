import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [otpStep, setOtpStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/userroute/userlogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.token && data.userId) {
                localStorage.setItem('authtoken', data.token);
                localStorage.setItem('userid', data.userId);
                alert("Login successful!");
                setIsLoggedIn(true);
                navigate('/allcards');
            } else {
                alert("Login failed: No token or userId received.");
            }
        } catch (e) {
            console.error("Error during login:", e);
            alert("Login failed.");
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/userroute/sendOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                setOtpStep(2);
            } else {
                setMessage(data.message || 'Error sending OTP');
            }
        } catch (err) {
            setMessage("Server error");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/userroute/verifyOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                setOtpStep(3);
            } else {
                setMessage(data.message || 'Invalid or expired OTP');
            }
        } catch (err) {
            setMessage("Server error");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/userroute/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                setShowForgot(false);
                setOtpStep(1);
            } else {
                setMessage(data.message || 'Error resetting password');
            }
        } catch (err) {
            setMessage("Server error");
        }
    };

    return (
        <div className='w-full h-screen flex gap-96 p-5 bg-zinc-900 bg-cover overflow-hidden text-white justify-center items-center'>
            <div className='w-[1400px] h-[650px] rounded-xl flex flex-wrap'>
                <div className='flex flex-col mt-24 ml-32 justify-center items-center w-96 h-[500px] bg-transparent rounded-lg'>
                    <div className='text-center'>
                        <h1 className='font-bold text-3xl p-5'>{isLoggedIn ? "Welcome Back!" : "User Login"}</h1>
                    </div>

                    {!showForgot ? (
                        <form method='post' className='w-80' onSubmit={loginSubmit}>
                            <label>Email</label><br />
                            <input
                                type="email"
                                className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='off'
                            /><br /><br />

                            <label>Password</label><br />
                            <input
                                type="password"
                                className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'
                            /><br /><br />

                            <button className='p-1 w-full border rounded bg-blue-400' type='submit'>Login</button><br /><br />

                            <div className='text-center'>
                                <span>Forgot password? </span>
                                <button
                                    type="button"
                                    onClick={() => setShowForgot(true)}
                                    className="text-blue-500 underline"
                                >
                                    Click here
                                </button><br /><br />

                                <span>Looking for </span>
                                <Link to='/signup' className='text-blue-400 underline'>Signup</Link>
                            </div>
                        </form>
                    ) : (
                        <form className='w-80' onSubmit={
                            otpStep === 1
                                ? handleForgotPassword
                                : otpStep === 2
                                ? handleVerifyOtp
                                : handleResetPassword
                        }>
                            <p className='text-green-400 text-sm'>{message}</p><br />
                            {otpStep === 1 && (
                                <>
                                    <label>Enter your email</label><br />
                                    <input
                                        type="email"
                                        className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete='off'
                                    /><br /><br />
                                    <button className='p-1 w-full border rounded bg-blue-400'>Send OTP</button>
                                </>
                            )}
                            {otpStep === 2 && (
                                <>
                                    <label>Enter OTP</label><br />
                                    <input
                                        type="text"
                                        className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    /><br /><br />
                                    <button className='p-1 w-full border rounded bg-blue-400'>Verify OTP</button>
                                </>
                            )}
                            {otpStep === 3 && (
                                <>
                                    <label>New Password</label><br />
                                    <input
                                        type="password"
                                        className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    /><br /><br />
                                    <button className='p-1 w-full border rounded bg-blue-400'>Reset Password</button>
                                </>
                            )}
                            <br />
                            <div className='text-center'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setShowForgot(false);
                                        setOtpStep(1);
                                        setMessage('');
                                    }}
                                    className='text-red-400 underline'
                                >
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className='mt-80 text-7xl ml-60 font-bold'>
                    <div className='flex gap-1'>
                        <p>Book</p>
                        <p className='bg-red-700 px-1 py-2 text-center rounded-lg'>my </p>
                        <p>Tr!p</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
