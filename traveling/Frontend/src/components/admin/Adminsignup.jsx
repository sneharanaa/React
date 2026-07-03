import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {

    const [adminname , setadminname] = useState("");
    const [contact , setphone] = useState("");
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/adminroute/adminsignup" , {
                adminname ,
                contact ,
                email ,
                password
            })
            alert("Register successfully!");
            navigate('/adminpanel');
        }
        catch(e) {
            console.log(e);
        }
    }

  return (
    <>
        <div className='w-full h-screen flex justify-center item-center'>
        <div className='flex mt-20 justify-center item-center border border-zinc-800 w-96 h-[490px] rounded-lg'>
            <form 
                method='post' 
                onSubmit={submit}
            >
                <h1 className='font-bold text-3xl p-5 text-red-600'>Admin Registration</h1>
                <label htmlFor="adminname">Adminname</label><br/>
                <input 
                    type="text" 
                    className='p-1 text-sm border w-full rounded bg-zinc-300 text-zinc-700' 
                    name="adminname"  
                    value={adminname}    
                    onChange={(e) => setadminname(e.target.value)}         
                /><br/><br />

                <label htmlFor="contact">Contact Number</label><br/>
                <input  
                    type="text" 
                    className='p-1 text-sm border w-full rounded bg-zinc-300 text-zinc-700'
                    name="contact"  
                    value={contact}
                    onChange={(e) => setphone(e.target.value)}
                /><br/><br />

                <label htmlFor="email">Email</label><br/>
                <input 
                    type="email" 
                    className='p-1 text-sm border w-full rounded bg-zinc-300 text-zinc-700'
                    name="email" 
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                /><br /><br />

                <label htmlFor="password">Password</label><br/>
                <input 
                    type="password" 
                    className='p-1 text-sm border w-full rounded bg-zinc-300 text-zinc-700'
                    name="password" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                /> <br /><br />

                <button className='mt-2 p-1 w-full border rounded bg-blue-400' type='submit'>Submit</button><br/><br/>  

                <span>Looking for </span><Link style={{color: 'blue'}} className='underline hover:bg-sky-500' to='/dashboard/adminpanel'>signup</Link><br/><br/>
            </form>
        </div>
        </div>
    </>
  )
}

export default Signup