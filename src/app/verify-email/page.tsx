"use client"
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const VerifyPage = () => {

    const router = useRouter()
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)
    const [processing, setProcessing] = useState(false)

    const verifyEmail = async()=>{
        try{
            setProcessing(true)
            const response = await axios.post("/api/user/verify-email",{token:token})
            setProcessing(false)
            setIsVerified(true)
            setError(false)
            router.push('/login')
            
        }catch(error:any){
            setProcessing(false)
            setError(true)
            setIsVerified(false)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken)
    },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2 className='text-white font-bold'>VERIFY EMAIL</h2>
        <p className='my-5 p-2'>Please click the below verify email button to verify email</p>
        {processing && "verifying..."}
        <button className='border border-solid border-white my-4 rounded-lg p-4 outline-none' onClick={verifyEmail}>
            {
                isVerified ? <span className="text-green-500">Email Verified</span> : "Verify Email"
            }
        </button>

        {error && <span className='text-red-600'>Error verifying your email</span>}
    </div>
  )
}

export default VerifyPage