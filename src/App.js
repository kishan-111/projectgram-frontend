import React, {useEffect, createContext, useReducer,useContext} from 'react'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Navbar from './components/Navbar';
import CreatePost from './Pages/CreatePost';
import UserProfile from './Pages/UserProfile';
import ResetPassword from './Pages/ResetPassword';
import {reducer, initialState} from './reducers/userReducer';
import NewPassword from './Pages/NewPassword';
import DetailPage from './Pages/DetailPage';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER", payload:user})
    }else{
      if(!location.pathname.startsWith('/reset'))
       navigate('/signin')
    }
  },[])
  return (
          <Routes>
          <Route path="/" element = {<Navbar />}/>
            <Route index element = {<Home />}/>
            <Route path="createpost" element = {<CreatePost />}/>
            <Route exact path="profile" element = {<Profile />}/>
            <Route path="signup" element = {<Signup />}/>
            <Route path="signin" element = {<Signin />}/>
            <Route exact path="reset" element = {<ResetPassword />}/>
            <Route path="reset/:token" element = {<NewPassword />}/>
            <Route path="/profile/:userid" element={<UserProfile />} />
            <Route path="/post/:postid" element={<DetailPage />} />
          <Route/>
        </Routes>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
