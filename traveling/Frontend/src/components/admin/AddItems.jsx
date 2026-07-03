import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AddItems() {
    const [poster, setposter] = useState("");
    const [placename, setplacename] = useState("");
    const [days, setdays] = useState("");
    const [mode, setmode] = useState("");
    const [charge, setcharge] = useState("");
    const [description, setdescription] = useState("");
    const [fromdate, setdate] = useState("");
    const [todate, settodate] = useState("");
    const [backgroundimg, setbackgroundimg] = useState("");

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

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

    useEffect(() => {
        if (fromdate && days) {
            const startDate = new Date(fromdate);
            startDate.setDate(startDate.getDate() + parseInt(days));
            const newToDate = startDate.toISOString().split('T')[0];
            settodate(newToDate);
        }
    }, [fromdate, days]);

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

    const handleStateChange = async (selectedState) => {
        setState(selectedState);
        setCity(""); 
        setCities([]); 
        try {
            const res = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
                country,
                state: selectedState
            });
            setCities(res.data.data);
        } catch (err) {
            console.error("Error fetching cities", err);
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!country || !state || !city) {
            alert("Please select country, state, and city.");
            return;
        }

        const fromDateObj = new Date(fromdate);
        const toDateObj = new Date(todate);

        try {
            const res = await axios.post("http://localhost:3000/adminroute/additems", {
                poster,
                placename,
                days,
                mode,
                charge,
                description,
                date: fromDateObj,
                todate: toDateObj,
                backgroundimg,
                country, 
                state, 
                city 
            });

            if (res.data.status) {
                alert("Data added successfully!");
                // Reset the form
                setposter("");
                setplacename("");
                setdays("");
                setmode("");
                setcharge("");
                setdescription("");
                setdate("");
                settodate("");
                setbackgroundimg("");
                setCountry("");
                setState("");
                setCity("");
            } else {
                console.error("Error adding item:", res.data.message);
            }
        } catch (e) {
            console.error("Error adding item:", e);
        }
    };

    return (
        <>
            <div className='p-5 justify-center item-center flex'>
                <div className='border border-zinc-500 mt-5 ml-10 rounded-2xl w-[600px] min-h-[900px] p-3 justify-center item-center flex flex-col'>
                    <h1 className='font-bold text-red-600 text-center text-3xl'>Add the Tour or Trips</h1><br />
                    <form method='post' onSubmit={handlesubmit}>
                        <div>
                            <label className='font-bold ml-16' htmlFor="country">Country : </label>
                            <select
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                name="country"
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
                            <label className='font-bold ml-20' htmlFor="state">State : </label>
                            <select
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                name="state"
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
                            <label className='font-bold ml-24' htmlFor="city">City : </label>
                            <select
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                name="city"
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
                            <label className='font-bold ml-24' htmlFor="poster">Poster : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="text"
                                name="poster"
                                value={poster}
                                onChange={(e) => setposter(e.target.value)}
                            /><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-14' htmlFor="placename">Place Name : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="text"
                                name="placename"
                                value={placename}
                                onChange={(e) => setplacename(e.target.value)}
                            /><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-28' htmlFor="days">Days : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="number"
                                name="days"
                                value={days}
                                onChange={(e) => setdays(e.target.value)}
                            /><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-24' htmlFor="mode">Mode : </label>
                            <select
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                name="mode"
                                value={mode}
                                onChange={(e) => setmode(e.target.value)}
                            >
                                <option value="select">Select</option>
                                <option value="Train">Train</option>
                                <option value="Plane">Plane</option>
                            </select><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-24' htmlFor="charge">Charge : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="number"
                                name="charge"
                                value={charge}
                                onChange={(e) => setcharge(e.target.value)}
                            /><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-14' htmlFor="description">Description : </label>
                            <textarea
                                required
                                name="description"
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                rows="3"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                            <br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-28' htmlFor="fromdate">From : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="date"
                                name="fromdate"
                                value={fromdate}
                                onChange={(e) => setdate(e.target.value)}
                            /><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-28' htmlFor="todate">To : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="date"
                                name="todate"
                                value={todate}
                                disabled
                            /><br /><br />
                        </div>
                        <div>
                            <label className='font-bold ml-5' htmlFor="backgroundimg">Background Image : </label>
                            <input
                                required
                                className='border border-zinc-300 p-2 text-sm rounded w-80 text-zinc-700'
                                type="text"
                                name="backgroundimg"
                                value={backgroundimg}
                                onChange={(e) => setbackgroundimg(e.target.value)}
                            /><br /><br />
                        </div>
                        <div className='item-center justify-center flex'>
                            <button className='font-semibold w-28 text-white border p-2 bg-red-600 rounded w-20'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddItems;
