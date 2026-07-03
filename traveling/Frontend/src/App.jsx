import React from 'react'
import { BrowserRouter , Routes , Route, Router } from "react-router-dom";
import Home from './components/user/Home';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Adminsignup from './components/admin/Adminsignup';
import Adminlogin from './components/admin/Adminlogin';
import Adminpanel from './components/admin/Adminpanel';
import AddItems from './components/admin/AddItems';
import Allitems from './components/admin/Allitems';
import Update from './components/admin/Update';
import Tripcard from './components/user/Tripcard';
import Allcards from './components/user/Allcards';
import PeopleSelection from './components/user/PeopleSelection';
import Ticket from './components/user/Ticket';
import About from './components/user/About';
import Showbooking from './components/user/Showbooking';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/allcards' element={<Allcards/>}></Route>
          <Route path='/tripcard/:id' element={<Tripcard/>}></Route>
          <Route path='/peopleselection/:id' element={<PeopleSelection/>}></Route>
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path='/about' element={<About/>}></Route>
          <Route path='/showbooking' element={<Showbooking/>}></Route>

          <Route path='/dashboard' element={<Adminpanel/>}></Route>
          <Route path='/dashboard/adminsignup' element={<Adminsignup/>}></Route>
          <Route path='/adminpanel' element={<Adminlogin/>}></Route>
          <Route path='/dashboard/additems' element={<AddItems/>}></Route>
          <Route path='/dashboard/allitems' element={<Allitems/>}></Route>
          <Route path='/dashboard/update/:id' element={<Update/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App