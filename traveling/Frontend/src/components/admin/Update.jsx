import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [card, setCard] = useState({
    country: "" ,
    state : "" ,
    city : "" ,
    poster: "",
    placename: "",
    days: "",
    mode: "",
    charge: "",
    description: "",
    date: "",
    backgroundimg: "",
  });

  const [todate, setToDate] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/adminroute/${id}`);
        setCard(result.data);
        setToDate(calculateToDate(result.data.date, result.data.days));
        setCountry(result.data.country || "");
        setState(result.data.state || "");
        setCity(result.data.city || ""); 
  
        if (result.data.country) {
          await handleCountryChange(result.data.country);
        }
  
        if (result.data.state) {
          await handleStateChange(result.data.state);
        }

      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);
  

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
        setCountries(res.data.data.map(c => c.name));
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    };
    fetchCountries();
  }, []);

  const calculateToDate = (fromDate, days) => {
    const startDate = new Date(fromDate);
    startDate.setDate(startDate.getDate() + parseInt(days));
    return startDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));

    if (name === 'date') {
      setToDate(calculateToDate(value, card.days));
    }

    if (name === 'days') {
      setToDate(calculateToDate(card.date, value));
    }
  };

  const handleCountryChange = async (selectedCountry) => {
    setCountry(selectedCountry);
    setState("");
    setCity("");
    setStates([]);
    setCities([]);
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/states", {
        country: selectedCountry
      });
      setStates(res.data.data.states.map(s => s.name));
    } catch (err) {
      console.error("Error fetching states", err);
    }
  };

  const handleStateChange = async (selectedState, fetchedCity = null) => {
    setState(selectedState);
    setCity("");
    setCities([]);
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country,
        state: selectedState
      });
      const cityList = res.data.data;
      setCities(cityList);
      if (fetchedCity && cityList.includes(fetchedCity)) {
        setCity(fetchedCity);
      }
    } catch (err) {
      console.error("Error fetching cities", err);
    }
  };  

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const updatedCard = {
      ...card,
      country,
      state,
      city,
      date: new Date(card.date),
      todate: new Date(todate),
    };
  
    try {
      await axios.put(`http://localhost:3000/adminroute/update/${id}`, updatedCard);
      alert("Data updated successfully!");
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };  

  return (
    <div className='p-2 justify-center item-center flex'>
      <div className='border border-zinc-500 mt-5 ml-10 rounded-2xl w-[600px] h-auto p-3 justify-center flex flex-col'>
        <h1 className='font-bold text-3xl text-red-500 text-center'>Update Data</h1><br />

        <form method='post'>
          <div>
            <label className='font-bold ml-16'>Country:</label>
            <select
              required
              className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((ctry, idx) => (
                <option key={idx} value={ctry}>{ctry}</option>
              ))}
            </select><br /><br />
          </div>

          <div>
            <label className='font-bold ml-20'>State:</label>
            <select
              required
              className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
              value={state}
              onChange={(e) => handleStateChange(e.target.value)}
              disabled={!country}
            >
              <option value="">Select State</option>
              {states.map((st, idx) => (
                <option key={idx} value={st}>{st}</option>
              ))}
            </select><br /><br />
          </div>

          <div>
            <label className='font-bold ml-24'>City:</label>
            <select
              required
              className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
            >
              <option value="">Select City</option>
              {cities.map((ct, idx) => (
                <option key={idx} value={ct}>{ct}</option>
              ))}
            </select><br /><br />
          </div>

          <div>
            <label className='font-bold ml-24'>Poster : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="text"
              name="poster"
              value={card.poster}
              autoComplete='off'
              onChange={handleChange}
            /><br /><br />
          </div>

          <div>
            <label className='font-bold ml-14'>Place Name : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="text"
              name="placename"
              value={card.placename}
              autoComplete='off'
              onChange={handleChange}
            /><br /><br />
          </div>

          <div>
            <label className='font-bold ml-28'>Days : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="number"
              name="days"
              value={card.days}
              autoComplete='off'
              onChange={handleChange}
            /><br /><br />
          </div>

          <div>
            <label className='font-bold ml-24'>Mode : </label>
            <select
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              name="mode"
              value={card.mode}
              onChange={handleChange}
              required
            >
              <option value="select">Select</option>
              <option value="Train">Train</option>
              <option value="Plane">Plane</option>
            </select><br /><br />
          </div>

          <div>
            <label className='font-bold ml-24'>Charge : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="number"
              name="charge"
              value={card.charge}
              autoComplete='off'
              onChange={handleChange}
            /><br /><br />
          </div>

          <div>
            <label className='font-bold ml-14'>Description : </label>
            <textarea
              name="description"
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              rows="3"
              value={card.description}
              autoComplete='off'
              onChange={handleChange}
              required
            ></textarea><br /><br />
          </div>

          <div>
            <label className='font-bold ml-28'>From Date : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="date"
              name="date"
              value={card.date ? card.date.toString().split('T')[0] : ''}
              autoComplete='off'
              onChange={handleChange}
            /><br /><br />
          </div>

          <div>
            <label className='font-bold ml-28'>To Date : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="date"
              name="todate"
              value={todate}
              autoComplete='off'
              disabled
            /><br /><br />
          </div>

          <div>
            <label className='font-bold ml-2'>Background Image : </label>
            <input
              required
              className='border border-zinc-300 p-2 text-sm text-zinc-500 rounded w-80 text-zinc-700'
              type="text"
              name="backgroundimg"
              value={card.backgroundimg}
              autoComplete='off'
              onChange={handleChange}
            /><br /><br />
          </div>

          <div className='item-center justify-center flex'>
            <button className='border text-white w-32 p-1 bg-red-600 rounded' onClick={handleUpdate}>
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Update;
