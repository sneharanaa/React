import axios from 'axios'; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [username , setusername] = useState("");
    const [contact , setphone] = useState("");
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/userroute/usersignup", {
                username,
                contact,
                email,
                password
            });
            alert("User Registered!");
            navigate('/login');
        } catch (e) {
            console.log(e);
            alert("An error occurred. Please try again later.");
        }
    }

    return (
        <>
            <div className='w-full h-screen flex gap-96 p-5 bg-zinc-900 bg-cover overflow-hidden text-white justify-center items-center'>
                <div className=' w-[1400px] h-[650px] rounded-xl flex flex-wrap'>
                <div className='flex mt-24 ml-32 justify-center items-center w-96 h-[500px] bg-transparent rounded-lg'>
                    <form onSubmit={submit}>
                        <h1 className='font-bold text-4xl p-5 text-gray-300'>User Registration</h1>

                        <label className='text-gray-300' htmlFor="username">Username</label><br/>
                        <input 
                            type="text" 
                            className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200' 
                            name="username" 
                            value={username}
                            onChange={(e) => setusername(e.target.value)} 
                            autoComplete='off'
                        /><br/><br />

                        <label className='text-gray-300' htmlFor="contact">Contact Number</label><br/>
                        <input  
                            type="number" 
                            className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                            name="contact"  
                            value={contact}
                            onChange={(e) => setphone(e.target.value)} 
                            autoComplete='off'
                        /><br/><br />

                        <label className='text-gray-300' htmlFor="email">Email</label><br/>
                        <input 
                            type="email" 
                            className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                            name="email" 
                            value={email}
                            onChange={(e) => setemail(e.target.value)} 
                            autoComplete='off'
                        /><br /><br />

                        <label className='text-gray-300' htmlFor="password">Password</label><br/>
                        <input 
                            type="password" 
                            className='mt-1 px-3 py-2 text-sm border w-full rounded bg-transparent text-gray-200'
                            name="password" 
                            value={password}
                            onChange={(e) => setpassword(e.target.value)} 
                            autoComplete='off'
                        /> <br /><br />

                        <button className='mt-2 px-1 py-2 w-full rounded-lg bg-blue-600' type='submit'>Submit</button><br/><br/>
                        <div className='text-center'>
                            <span>Looking for </span><Link style={{ color: 'blue' }} className='underline hover:bg-sky-500' to='/login'>Login</Link><br /><br />
                        </div>
                    </form>
                </div>
                <div className='mt-80 text-7xl ml-60 font-bold'>
                    <div className='flex gap-1'>
                        <p>Book</p>
                        <p className='bg-red-700 px-1 py-2 text-center rounded-lg'>my </p>
                        <p > Tr!p</p>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
