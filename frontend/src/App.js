import React,{useState, useEffect} from "react"
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import BookApi from "./api";
import Home from "./Home";
import EditProfileForm from "./EditProfileForm"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import NavBar from "./NavBar";
import jwt from "jsonwebtoken";
import useLocalStorageState from "./hooks/useLocalStorageState"
import CurrentUserContext from "./CurrentUserContext"


function App() {
  const [currentUser,setCurrentUser]=useState(null);
  const [isDataLoaded,setIsDataLoaded]=useState(false);
  const [token,setToken]=useLocalStorageState("token");
  useEffect(()=>{
    async function getCurrentUser(){
    if(token){
      try{
      let{username}=jwt.decode(token)
      BookApi.token=token
      let currentUser=await BookApi.getCurrentUser(username);
      setCurrentUser(currentUser)
    } catch (e){
      console.error("error loading",e)
      setCurrentUser(null)
    }
  }
  setIsDataLoaded(true)
}
setIsDataLoaded(false)
getCurrentUser()
},[token]);
async function signup(data){
  try{
    let token=await BookApi.signup(data);
    setToken(token)
    return {success:true}
    } catch (e){
      console.error("failed",e)
      return {success:false}
    }
    
  }
  async function login(data){
    try{
      let token=await BookApi.login(data)
      setToken(token)
      return {success:true}
    } catch (e){
      console.error("failed",e)
      return {success:false}
    }
  }
  function logout(){
    setCurrentUser(null)
    setToken(null)
  }
  async function save(username,data){
    let profileData={
      first_name:data.first_name,
      last_name:data.lastName,
      email:data.email,
      image:data.image
    }
    try{
      let user=await BookApi.update(username,profileData)
      setCurrentUser(user)
      return {success:true}
    } catch (e){
      console.error("failed",e)
      return {success:false}
    }
  }

if(!isDataLoaded) return <h3>Loading</h3>
  return (
    <div className="App">
    <BrowserRouter>
      <CurrentUserContext.Provider value={{currentUser}}>
        <NavBar logout={logout}/>
        <main>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/signup'>
              <SignUpForm signup={signup}/>
            </Route>
            <Route exact path='/login'>
              <LoginForm login={login}/>
            </Route>
            <Route exact path='/profile'>
              <EditProfileForm save={save}/>
            </Route>
          </Switch>
        </main>
      </CurrentUserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
