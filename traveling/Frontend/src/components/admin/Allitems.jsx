import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Allitems() {
    
    const [card , setcard] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:3000/adminroute/card")
        .then((m) => setcard(m.data))
        .catch((e) => console.log(e));
    } , []);

    const deletecard = async (cardid) => {
        try {
            await axios.delete(`http://localhost:3000/adminroute/delete/${cardid}`);
            setcard((prevcard) => prevcard.filter((card) => card._id !== cardid));
        }
        catch(e) {
            console.log(e);
        }
    };

  return (
    <>
        <div className='p-5 w-full overflow-hidden'>
            <div className='border border-zinc-400 rounded-xl p-5'>
                <div className='text-center text-blue-500 font-bold text-3xl'>All Data</div>
                <div className=''>
                    <div className='flex flex-wrap gap-5 p-5 w-full px-5 py-5 item-center justify-center overflow-scroll'>
                    {
                        card.map(card => {
                            return (
                                <div className=''>
                                <div className='border border-2 rounded-lg border-zinc-400 w-80 h-[350px] rounded-xl p-3' key={card._id}>
                                    <img className='h-52 w-full rounded-xl' src={card.poster} alt="card.title" /><br/>
                                    <p>{card.placename}</p><br/>
                                    <div className='flex item-center justify-center gap-10'>
                                        <button className='border p-2 w-32 bg-blue-500 text-white rounded-xl'>
                                            <Link to={`/dashboard/update/${card._id}`}>Update</Link>
                                        </button>
                                        <button 
                                            className='border p-2 w-32 bg-red-700 text-white rounded-xl'
                                            onClick={() => deletecard(card._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Allitems