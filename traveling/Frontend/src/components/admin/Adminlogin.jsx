import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [adminname , setadminname] = useState("");
    const [password , setpassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/adminroute/adminlogin" , {
                adminname ,
                password
            })
            alert('Login successfully!');
            navigate('/dashboard');
        }
        catch(e) {
            console.log(e);
        }
    }

  return (
    <>
        <div className='w-full h-screen flex justify-center item-center'>
        <div className='flex flex-col p-5 mt-40 justify-center item-center border border-zinc-700 w-80 h-96  rounded-lg'>
            <div className='text-center'>
                <h1 className='font-bold text-3xl p-5 text-red-600'>Admin Login</h1>
            </div>
            <form 
                method='post' 
                onSubmit={submit}
            >   
                <label htmlFor="adminname">Adminname</label><br/>
                <input 
                    type="adminname" 
                    className='p-1 text-sm border w-full rounded bg-zinc-300 text-zinc-700'
                    name="adminname" 
                    value={adminname}
                    onChange={(e) => setadminname(e.target.value)}
                /><br /><br />

                <label htmlFor="password">Password</label><br/>
                <input 
                    type="password" 
                    className='p-1 text-sm border w-full rounded bg-zinc-300 text-zinc-700'
                    name="password" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                /><br /><br />  

                <span>Looking for </span><Link style={{color: 'blue'}} className='underline hover:bg-sky-500' to='/dashboard/adminsignup'>signup</Link><br/><br/>

                <button className='p-1 w-full border rounded bg-blue-400' type='submit'>Submit</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default Login