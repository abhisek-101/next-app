import React from 'react'

const DisplayList = ({userData}:any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <span className='font-bold mb-5 underline underline-offset-2'>DETAILS</span>
      {
        Object.entries(userData).map(([key, value]:any,index:any)=>{
          return(
            <div key={value} className="p-4 flex justify-between w-6/12">
                <span className='text-white'>{key}</span>
                <span className="bg-orange-400 text-black font-bold rounded p-2">{value}</span>
              </div>
          )
        })
      }
    </div>
  )
}

export default DisplayList