import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

function Showbooking() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/userroute/booking/${userId}`);
        setBookings(result.data);
      } catch (e) {
        setError('Failed to load booking data.');
        console.error(e);
      }
    };

    if (userId) {
      fetchBookings();
    } else {
      setError('Please log in to view your bookings.');
    }
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (bookings.length === 0) {
    return <div>Loading...</div>;
  }

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:3000/userroute/booking/${bookingId}`);
      setBookings((prevBookings) => prevBookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel booking", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const handleExpired = async () => {
    alert("This trip is Expired!")
  };

  const handletrip = async () => {
    navigate('/allcards');
  };

  const handlehome = async () => {
    navigate('/');
  };

  return (
    <div className='h-screen w-full overflow-hidden bg-zinc-900 text-white'>
      <div className="w-full flex flex-col justify-center items-center p-10 mt-10">
        <div className="bg-transparent shadow-lg rounded-lg p-6 w-full max-w-7xl border border-gray-300">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Your Booking Details</h1>

          <table className="min-w-full bg-transparent border border-gray-300 overflow-scroll">
            <thead>
              <tr className="text-left border-b">
                <th className="px-4 py-2 text-gray-400">Trip Place</th>
                <th className="px-4 py-2 text-gray-400">Days</th>
                <th className="px-4 py-2 text-gray-400">Mode</th>
                <th className="px-4 py-2 text-gray-400">Charge</th>
                <th className="px-4 py-2 text-gray-400">Date</th>
                <th className="px-4 py-2 text-gray-400">People</th>
                <th className="px-4 py-2 text-gray-400">Food Type</th>
                <th className="px-4 py-2 text-gray-400">Payment Method</th>
                <th className="px-4 py-2 text-gray-400">Total Charge</th>
                <th className="px-4 py-2 text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const bookingDate = new Date(booking.tripId.date);
                const currentDate = new Date();
                const isPastBooking = bookingDate < currentDate;
                return (
                  <tr key={booking._id} className="border-b hover:bg-gray-800">
                    <td className="px-4 py-2">{booking.tripId.placename}</td>
                    <td className="px-4 py-2">{booking.tripId.days}</td>
                    <td className="px-4 py-2">{booking.tripId.mode}</td>
                    <td className="px-4 py-2">₹{booking.tripId.charge}</td>
                    <td className="px-4 py-2">{bookingDate.toDateString()}</td>
                    <td className="px-4 py-2">{booking.numberOfPeople}</td>
                    <td className="px-4 py-2">{booking.foodType}</td>
                    <td className="px-4 py-2">{booking.paymentMethod}</td>
                    <td className="px-4 py-2">₹{booking.totalCharge}</td>
                    <td className="px-4 py-2 flex gap-2">
                      {isPastBooking ? (
                        <button
                          onClick={handleExpired}
                          className="bg-zinc-500 hover:bg-gray-700 text-white px-3 py-1 rounded"
                        >
                          Expired
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-800"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-center gap-4 mt-6">
            <button onClick={handletrip} className="bg-blue-600 px-5 py-2 rounded-lg text-white">Browse More Trips</button>
            <button onClick={handlehome} className="bg-green-600 px-5 py-2 rounded-lg text-white">Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showbooking;
