import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import train from "/train.mp4";

function PeopleSelection() {
  const [numberOfPeople, setNumberOfPeople] = useState(1); // Default value is 1
  const [trip, setTrip] = useState(null);
  const [foodType, setFoodType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    upiId: "",
  });
  const [peopleDetails, setPeopleDetails] = useState([{ name: "", mobile: "" }]); // Default 1 person
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/adminroute/${id}`);
        setTrip(result.data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchTripData();
  }, [id]);

  const handleNumberOfPeopleChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && Number.isInteger(value)) {
      setNumberOfPeople(value);
      setPeopleDetails(Array(value).fill({ name: "", mobile: "" }));
    }
  };

  const handlePersonDetailChange = (index, field, value) => {
    const updatedPeople = [...peopleDetails]; 
    updatedPeople[index] = { ...updatedPeople[index], [field]: value };  
    setPeopleDetails(updatedPeople);  
  };  

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentDetailsChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const totalCharge = trip?.charge ? trip.charge * numberOfPeople : 0;

  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("Please log in to book a trip.");
        return;
      }
  
      if (
        peopleDetails.some((person) => person.name === "" || person.mobile === "") ||
        !paymentMethod ||
        !foodType
      ) {
        alert("Please fill in all fields.");
        return;
      }
  
      const data = {
        numberOfPeople,
        personNames: peopleDetails.map(person => person.name),  // Extract names
        personNumber: peopleDetails.map(person => person.mobile),  // Extract mobile numbers
        foodType,
        paymentMethod,
        paymentDetails,
        totalCharge,
        userId,
        tripId: id,
      };
  
      const response = await axios.post("http://localhost:3000/userroute/userbooking", data);
      if (response.data) {
        alert("Booking successful!");
        navigate(`/ticket/${id}`);
      }
    } catch (error) {
      console.error("Error processing booking:", error);
      alert("There was an error with your booking.");
    }
  };
  

  return (
    <div className="w-full h-screen flex bg-zinc-900 text-white">
      <div className="h-full w-1/2 relative overflow-hidden">
        <video
          className="absolute top-0 left-0 h-full w-full object-cover"
          src={train}
          autoPlay
          loop
          muted
        />
      </div>

      <div className="w-1/2 h-screen flex items-center justify-center p-10 overflow-y-scroll">
        <form method="post" className="h-full w-full p-6 md:p-10">
          <h1 className="text-center font-bold text-2xl text-gray-300 mb-6">
            Fill the Details
          </h1>

          <div className="mb-4 w-full">
            <label htmlFor="numberofpeople">Number of people:</label>
            <select
              name="numberofpeople"
              className="border border-gray-400 p-2 mt-2 w-full bg-transparent"
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option className="bg-zinc-900" key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {peopleDetails.map((person, index) => (
            <div key={index} className="mb-4 border-b border-gray-600 pb-4">
              <label className="block mb-1">
                Person {index + 1} Name:
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 w-full bg-transparent mb-2"
                placeholder={`Enter name for person ${index + 1}`}
                value={person.name}
                onChange={(e) => handlePersonDetailChange(index, "name", e.target.value)}  
                required
              />

              <label className="block mb-1">
                Person {index + 1} Mobile Number:
              </label>
              <input
                type="tel"
                className="border border-gray-400 p-2 w-full bg-transparent"
                placeholder={`Enter mobile number for person ${index + 1}`}
                value={person.mobile}  
                onChange={(e) => handlePersonDetailChange(index, "mobile", e.target.value)} 
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="foodType" className="block">
              Food Type:
            </label>
            <select
              name="foodType"
              className="border border-gray-400 p-2 w-full bg-transparent"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            >
              <option className="bg-zinc-900" value="">
                --- Select ---
              </option>
              <option className="bg-zinc-900" value="vegetarian">
                Vegetarian
              </option>
              <option className="bg-zinc-900" value="nonvegetarian">
                Non-Vegetarian
              </option>
            </select>
          </div>

          <div className="mb-4">
            {trip ? (
              <div className="flex flex-col gap-2">
                <h2>
                  Charge per person: <span className="text-blue-400">{trip.charge}</span>
                </h2>
                <h3>
                  Total charge for {numberOfPeople} person(s):{" "}
                  <span className="text-blue-400">{totalCharge}</span>
                </h3>
                <p>Are you excited to visit {trip.placename}?</p>
              </div>
            ) : (
              <p>Loading trip details...</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block">Payment Method:</label>
            <div className="flex flex-wrap gap-4">
              {["cash", "upi", "card", "online"].map((method) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {paymentMethod === "upi" && (
            <div className="mb-4">
              <label htmlFor="upiId">Enter UPI ID:</label>
              <input
                type="text"
                name="upiId"
                className="border p-2 w-full border-gray-400 bg-zinc-900"
                placeholder="Enter your UPI ID"
                value={paymentDetails.upiId}
                onChange={handlePaymentDetailsChange}
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="mb-4">
              <label htmlFor="cardNumber">Enter Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                className="border p-2 w-full border-gray-400 bg-zinc-900"
                placeholder="Enter your card number"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentDetailsChange}
              />
            </div>
          )}

          {paymentMethod === "online" && (
            <div className="flex justify-center mt-4">
              <label htmlFor="onlinepayment" className="block mr-2">
                Scan for Online Payment:
              </label>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(
                  paymentDetails.upiId || `tripId=${id}&amount=${totalCharge}`
                )}`}
                alt="QR Code"
                className="rounded-lg shadow"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 bg-red-700 text-white px-4 py-2 rounded-lg block mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PeopleSelection;
