import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HOST = "https://projectgram-backend.onrender.com"

function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  function handleResetPassword(event){
    event.preventDefault();

    fetch(`${HOST}/reset-password`, {
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email})
    }).then(res => {
      return res.json();
    })
    .then(data => {
      const error=null;
      if(data.error){
        alert(data.error)
      }else{
        alert('check your mail')
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
        <span className="text-4xl font-bold ml-4 bg">Reset Password</span>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleResetPassword}>
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
                <div className="flex justify-center">
                  <button type="submit" className="w-full btn" >
                    Submit
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
export default ResetPassword;
