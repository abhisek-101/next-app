import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export const POST = async(request:NextRequest)=>{

    try{

        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"No such user found. Please sign up before"},{status:400})
        }

        //verify password
        const validPassword = bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        //create token data
        const tokenData = {
            id : user._id,
            username: user.username,
            email : user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1h"})

        const response = NextResponse.json({
            message:"login successful",
            success:true
        })

        response.cookies.set("token", token,{
            httpOnly:true,
        })

        return response;
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}