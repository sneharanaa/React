import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Tripcard() {
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/adminroute/${id}`);
        setTrip(result.data);
        setError(null); 
      } catch (e) {
        setError('Failed to load trip data.');
        console.log(e);
      }
    };
    fetchTrip();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!trip) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const backgroundSet = {
    backgroundImage: `url(${trip.backgroundimg || 'defaultBackground.jpg'})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="w-full h-screen text-white bg-cover  flex justify-center items-center " style={backgroundSet}>
      <div className='w-full h-full p-5 bg-black bg-opacity-50 flex justify-start items-center '>
        <div className='ml-28'>
          <img className='w-[550px] h-[350px] rounded-2xl' src={trip.poster || 'defaultPoster.jpg'} alt="poster.image" />  {/* Default fallback poster */}
        </div>
        <div className='p-5 flex flex-col gap-5 justify-start '>
          <h1 className='text-4xl font-bold' >{trip.placename}</h1> 
          <div className='text-sm w-96 flex flex-col gap-3 w-[550px]'>
            <div className='flex gap-5 font-semibold'>
              <p>{trip.days} days</p>
             <span className='flex'> Mode :<p className='text-xl'>{trip.mode === 'Train' ? '🚆' : trip.mode === 'Plane' ? '✈️' : ''}</p></span>
            </div>
            <p className='font-semibold'>Cost : {trip.charge}</p>
            <div className='flex gap-8'>
              <p className='font-semibold'>From : {formatDate(trip.date)}</p>
              <p className='font-semibold'>To : {formatDate(trip.todate)}</p>
            </div>
            <p className='font-semibold'>{trip.description}</p>
          </div>
          <div className='bg-blue-600 px-5 py-1 text-sm rounded-lg w-40 font-semibold text-center hover:scale-95'>
              <Link to={`/peopleselection/${trip._id}`}>Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tripcard;
