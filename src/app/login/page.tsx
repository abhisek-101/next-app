"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  React.useEffect(()=>{
    if(user.email.length > 5 && user.password.length >= 8){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  const handleLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post("/api/user/login",user);
      console.log(response)
      router.push(`/profile/${user.email}`)
    }catch(error){
      prompt("login action failed!!")
    }finally{
      setLoading(false);
      setButtonDisabled(true)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="p-1 mb-3">{loading ? "LOGGING..":"LOGIN"}</h1>
      <hr />
      <div className="flex flex-col">
        
        <div className="flex flex-col mb-2">
        <label htmlFor="email" className=" text-sm">Email</label>
        <input
          className="p-2 mb-2 rounded-lg focus:outline-none"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
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
        <button
        disabled={buttonDisabled}
          onClick={handleLogin}
          className="p-2 my-2 border border-gray-300 focus:outline-none focus:border-gray-600 hover:border-solid border-dashed rounded-lg"
        >
          Login
        </button>
        <span className="text-sm">Don't have an account?<Link href={"/signup"}> Sign up</Link></span>
      </div>
    </div>
  );
};

export default LoginPage;
