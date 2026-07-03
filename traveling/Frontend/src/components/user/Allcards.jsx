import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Allcards() {
  const [card, setCard] = useState([]);
  const [searchbar, setSearchbar] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/adminroute/cardsoftrip")
      .then((m) => {
        setCard(m.data);

        // Set countries, states, cities independently
        const uniqueCountries = [...new Set(m.data.map(c => c.country))];
        const uniqueStates = [...new Set(m.data.map(c => c.state))];
        const uniqueCities = [...new Set(m.data.map(c => c.city))];

        setCountries(uniqueCountries);
        setStates(uniqueStates);
        setCities(uniqueCities);
      })
      .catch((e) => console.log(e));
  }, []);

  // Filter based on Searchbar and Dropdown selections
  const filteredCards = card.filter((c) => {
    return (
      c.placename.toLowerCase().includes(searchbar.toLowerCase()) &&
      (selectedCountry ? c.country === selectedCountry : true) &&
      (selectedState ? c.state === selectedState : true) &&
      (selectedCity ? c.city === selectedCity : true)
    );
  });

  return (
    <div className="min-h-screen py-5 bg-zinc-900 bg-cover bg-no-repeat overflow-hidden text-white">
      <div className="w-full h-full bg-black bg-opacity-50 p-3">
        <div className="flex p-5">
          <button
            onClick={() => navigate(-1)}
            className="font-bold text-xl mt-0 text-blue-700 ml-full"
          >
            {" <<"}Back
          </button>
          <div className="ml-auto text-right">
            <h1 className="font-bold text-2xl text-gray-400">
              Popular Destination
            </h1>
            <p className="text-gray-400">
              Discover our most loved destinations across the globe
            </p>
          </div>
        </div>

        {/* Search Bar and Dropdowns */}
        <div className="flex flex-wrap justify-center mt-10 gap-5">
          <input
            type="text"
            placeholder="Search by Place Name"
            value={searchbar}
            onChange={(e) => setSearchbar(e.target.value)}
            className="p-2 w-60 rounded-lg text-black"
          />
          <select
            className="p-2 w-48 rounded-lg text-black"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>{country}</option>
            ))}
          </select>

          <select
            className="p-2 w-48 rounded-lg text-black"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state, idx) => (
              <option key={idx} value={state}>{state}</option>
            ))}
          </select>

          <select
            className="p-2 w-48 rounded-lg text-black"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-10 p-5 justify-center items-center mt-10">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div
                key={card._id}
                className="text-gray-300 rounded-xl transform transition-all hover:scale-105 hover:border-4 hover:border-blue-500"
                style={{
                  backgroundImage: `url(${card.poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "300px",
                  width: "400px",
                }}
              >
                <div className="flex flex-col justify-between">
                  <div
                    className="details flex justify-between items-center w-full h-32 p-5 mt-44
                    bg-gradient-to-t from-black to-transparent"
                    style={{
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
                    }}
                  >
                    <h1 className="font-bold text-gray-300 text-3xl">
                      {card.placename}
                    </h1>
                    <Link
                      className="text-blue-600 font-semibold hover:scale-105 hover:underline ml-auto"
                      to={`/tripcard/${card._id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-xl">No places found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allcards;
