"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Get your self account to get full access of this problem',
}
const SignUpPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  React.useEffect(()=>{

    if(user.email.length > 5 && user.username.length > 5 && user.password.length >= 8)
      setButtonDisabled(false)
    else
      setButtonDisabled(true)
  },[user])

  const handleSignUp = async () => {

    try{
      setLoading(true);
      const response = await axios.post("/api/user/signup",user);
      console.log("Signup success ");
      router.push('/login')
    }catch(error:any){
      prompt("Signup failed: error")
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="p-1 mb-3">{loading ? "PROCESSING" : "SIGNUP"}</h1>
      <hr />
      <div className="flex flex-col">
        <div className="flex flex-col mb-2">
        <label htmlFor="email" className=" text-sm">
          Email
        </label>
        <input
          className="p-2 mb-2 rounded-lg focus:outline-none text-black"
          id="email"

          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        </div>
        <div className="flex flex-col mb-2">
        <label htmlFor="username" className=" text-sm">Username</label>
        <input
          className="p-2 mb-2 rounded-lg focus:outline-none text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        </div>
        <div className="flex flex-col mb-2">
        <label htmlFor="password" className=" text-sm">Password</label>
        <input
          className="p-2 mb-2 rounded-lg focus:outline-none text-black"
          id="passwrod"
          type="passwrod"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        </div>
        
           
        <button disabled={buttonDisabled}
          onClick={handleSignUp}
          className="disabled:text-gray-500 p-2 my-2 border border-gray-300 focus:outline-none focus:border-gray-600 hover:border-solid border-dashed rounded-lg"
        >
          Sign Up
        </button>

        <span className="text-sm">Already have an account?<Link href={"/login"}> Login</Link></span>
      </div>
    </div>
  );
};

export default SignUpPage;
