import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"

function Signin() {
  const {state, dispatch} = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  function handleLogin(event){
    event.preventDefault();

    console.log(HOST)

    fetch(`${HOST}/signin`, {
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email, password})
    }).then(res => {
      return res.json();
    })
    .then(data => {
      const error=null;
      if(data.error){
        // console.log(data.error);
        alert(data.error)
      }else{
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
        dispatch({type:"USER", payload: data.user}) 
        
        navigate('/');
      }
    })
    .catch(err=>{
        console.log(err);
    });
}
  return (
    <div className="sm:ml-64">
      <div className="absolute top-0 w- h-12">
        <span className="text-4xl font-bold ml-4 bg">Sign In</span>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    autoComplete="on"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="w-full btn" >
                    Login
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Create a New Account{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Link>

                  <br/>
                  <Link
                    to="/reset"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <u>Forgot Password</u>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Signin;
