
import './App.css';
import {React, useState, useEffect} from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import userContext from './userContext';
import MyNavBar from './Components/NavBar/MyNavBar';
import Home from './Components/Home/Home';
import SignUpForm from './Components/SignUpForm/SignUpForm'
import LoginForm from './Components/LoginForm/LoginForm';
import TourList from './Components/TourList/TourList';
import TourCreateForm from './Components/TourCreateForm/TourCreateForm';
import TourDetails from './Components/TourDetails/TourDetails';
import TourstopDetails from './Components/TourstopDetails/Tourstopdetails';
import UserForm from './Components/UserForm/UserForm';
import TourstopCreateForm from './Components/TourstopCreateForm/TourstopCreateForm';
import TourEditForm from './Components/TourEditForm/TourEditForm';
import TourDelete from './Components/TourDelete/TourDelete';
import { TourApi } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const [user, setUser] = useState({})
 


  // catch userdata and set API Token when App mounts, cleanUp resets Api token
  useEffect(()=>{
    let username = localStorage.getItem("username")
    let token = localStorage.getItem("token")
    if (username && token){
      TourApi.token = token
      getUser(username)
    }
  
  }, [user.token])


  // gets userdata for given username and stores it in State
  const getUser = async(username)=>{
    const res = await TourApi.getUser(username)
    setUser({...res, token: TourApi.token})   
  }


  // User Login leads to localStorage Update, Api Token Update and State Update
  const logIn = (data)=>{
    localStorage.setItem("username", data.username)
    localStorage.setItem("token", data.token)
    TourApi.token = data.token
    getUser(data.username)
  }

  // clear localStorage when Logout and clear Api Token
  const logOut = ()=>{
    localStorage.clear()
     TourApi.token = ""
  }



  // // Apply current user to given JobId
  // const applyJob = async (jobId)=>{
  //   try{
  //   const res = await JoblyApi.ApplyForJob(user.username, jobId)
  //   if (res.applied){
  //     alert(`You just applied for Job ${res.applied}`)
  //     getUser(user.username)
  //   }
  //   }
  //   catch(e){
  //     alert(`Oops something went wrong!`)
  //   }
  // }


  return (
    <div className="App">
      <userContext.Provider value={user}>
   <BrowserRouter>
        <MyNavBar user={user} logOut={logOut}/>
        <Routes>

          <Route exact path="/signup" element={<SignUpForm logIn={logIn}/>}></Route>    
       
          <Route exact path="/login" element={<LoginForm logIn={logIn}/>}></Route>    
      
          <Route exact path="/tours" element={<TourList getUser={getUser}/>}></Route>    
      
          <Route exact path="/tours/new" element={<TourCreateForm/>}></Route>    
      
          <Route exact path="/tours/:id" element={<TourDetails/>}></Route>    
       
          <Route exact path="/tourstops/:id" element={<TourstopDetails/>}></Route>    
        
          <Route exact path="/users/:username" element={<UserForm getUser = {getUser}/>}></Route>    
       
          <Route exact path="/tours/:id/edit" element={<TourEditForm/>}></Route> 

           <Route exact path="/tours/:id/delete" element={<TourDelete/>}></Route>      

              <Route exact path="/tours/:tour_id/tourstops/new" element={<TourstopCreateForm/>}></Route>        
        
          <Route exact path="/" element={<Home></Home>}></Route>    
       
        </Routes>
        </BrowserRouter>
        </userContext.Provider>
      
    </div>
  );
}

export default App;
