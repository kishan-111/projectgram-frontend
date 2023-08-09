import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"

function NewPassword() {
  const [password, setPassword] = useState('');
  const {token} = useParams()
  console.log(token)
  const navigate = useNavigate()

  function PostData(event){
    event.preventDefault();
    fetch(`${HOST}/new-password`, {
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({password, token})
    }).then(res => {
      return res.json();
    })
    .then(data => {
      const error=null;
      if(data.error){
        alert(data.error)
      }else{
        alert('Password updated')
        navigate('/signin');
      }
    })
    .catch(err=>{
        console.log(err);
    });
}
  return (
    <div className="sm:ml-64">
      <div className="absolute top-0 w- h-12">
        <span className="text-4xl font-bold ml-4 bg">New Password</span>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Set New Password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={PostData}>
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
                    placeholder="Enter your new password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    autoComplete="on"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="w-full btn" >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default NewPassword;
