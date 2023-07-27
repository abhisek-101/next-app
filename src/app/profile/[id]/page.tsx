import React from 'react'

const ProfileById = ({params}:any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <p className="text-4xl">My incoming id : {params.id}</p>
    </div>
  )
}

export default ProfileById;