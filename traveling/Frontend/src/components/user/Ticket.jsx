import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Ticket() {
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(null);
    const { userId } = useAuth();
    const ticketRef = useRef();

    const downloadTicket = () => {
        const input = ticketRef.current;
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('trip-ticket.pdf');
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authtoken');
            if (!token) {
                setError('Please log in to view your ticket.');
                return;
            }

            try {
                const result = await axios.get(`http://localhost:3000/userroute/ticket/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPerson(result.data[0]);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch ticket data.');
            }
        };

        fetchData();
    }, [userId]);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    if (!person) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <div className="relative w-full h-screen bg-zinc-900 text-white overflow-hidden">
            <div className="absolute inset-0 flex justify-center items-center z-0 transform -rotate-12">
                <div className="text-9xl font-extrabold flex gap-1">
                    <p>Book</p>
                    <p className="bg-red-700 px-1 py-2 text-center rounded-lg">my</p>
                    <p>Tr!p</p>
                </div>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-60 z-0 backdrop-blur-sm"></div>

            <div className="relative flex items-center justify-center h-full">
                <div className="flex flex-row gap-10 items-center">
                    <div className="flex flex-col gap-4 text-center">
                        <Link className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-gray-500" to={'/'}>Back to Home</Link>
                        <Link className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-500" to={'/allcards'}>Go for Another Booking</Link>
                        <button
                            onClick={downloadTicket}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                        >
                            Download Ticket
                        </button>
                    </div>

                    <div ref={ticketRef} className="bg-gray-300 shadow-lg rounded-lg ml-32 p-6 w-96 border border-gray-300">
                        <h1 className="text-2xl font-semibold text-center mb-4 text-blue-600">Trip Ticket</h1>

                        <div className="mb-3">
                            <p className="text-gray-700"><strong>User:</strong> {person.userId.username}</p>
                            <p className="text-gray-700"><strong>Contact:</strong> {person.userId.contact}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {person.userId.email}</p>
                        </div>

                        <div className="mb-3">
                            <h2 className="text-lg font-semibold text-gray-600">Trip Details</h2>
                            <p className="text-gray-700"><strong>Place:</strong> {person.tripId.placename}</p>
                            <p className="text-gray-700"><strong>Days:</strong> {person.tripId.days}</p>
                            <p className="text-gray-700"><strong>Mode:</strong> {person.tripId.mode}</p>
                            <p className="text-gray-700"><strong>Charge:</strong> ₹{person.tripId.charge}</p>
                            <p className="text-gray-700"><strong>Date:</strong> {new Date(person.tripId.date).toDateString()}</p>
                        </div>

                        <div className="mb-3">
                            <h2 className="text-lg font-semibold text-gray-600">Booking Details</h2>
                            <p className="text-gray-700"><strong>Number of People:</strong> {person.numberOfPeople}</p>
                            <p className="text-gray-700"><strong>People Names:</strong> {person.personNames?.join(', ') || "No names provided"}</p>
                            <p className="text-gray-700"><strong>People Phone Numbers:</strong> {person.personNumber?.join(', ') || "No phone numbers provided"}</p>
                            <p className="text-gray-700"><strong>Food Type:</strong> {person.foodType}</p>
                        </div>

                        <div className="mb-3">
                            <h2 className="text-lg font-semibold text-gray-600">Payment</h2>
                            <p className="text-gray-700"><strong>Method:</strong> {person.paymentMethod}</p>
                            {person.paymentMethod === 'card' && (
                                <p className="text-gray-700"><strong>Card Number:</strong> **** **** **** {person.paymentDetails.cardNumber.slice(-4)}</p>
                            )}
                            {person.paymentMethod === 'upi' && (
                                <p className="text-gray-700"><strong>UPI ID:</strong> {person.paymentDetails.upiId}</p>
                            )}
                            <p className="text-gray-700 text-xl font-bold"><strong>Total Charge:</strong> ₹{person.totalCharge}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;
