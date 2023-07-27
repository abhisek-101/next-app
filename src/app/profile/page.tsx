"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const LazyComponent = dynamic(() => import("@/components/DisplayList"), {
  loading: () => <div className="text-orange-400 font-bold bg-white">Loading.................</div>
});

const ProfilePage = () => {
  const router = useRouter();
  const handleLogout = async (e: any) => {
    try {
      const response = await axios.get("/api/user/logout");
      console.log(response);
      router.push("/login");
    } catch (error: any) {
      prompt("Error in logging out ");
      console.log(error);
    }
  };
  const [userData, setUserData] = useState({});

  const getUserDataFromToken = async () => {
    try {
      const data = await axios.get("/api/user/me");
      setUserData(data.data.user);
    } catch (error: any) {
      prompt("error in get user data");
    }
  };
  useEffect(() => {
    getUserDataFromToken();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-white mt-4 ml-r px-3 font-bold">MY PROFILE</h1>
        <button
          className="text-black border border-solid border-orange-300 font-bold h-8 px-3 mr-4 mt-4 rounded-lg bg-orange-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <LazyComponent userData={userData} />
    </>
  );
};

export default ProfilePage;
