import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()


export const POST = async(request:NextRequest)=>{
    try{
        const requestBody = await request.json()
        const {email, username, password} = requestBody

        console.log(requestBody)

        //check if useralready exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            username,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        sendEmail({email, emailType:'VERIFY', userId:savedUser._id})
        return NextResponse.json({message:"User created successfully",
        success:true,
    savedUser})

    }catch(error:any){
        return NextResponse.json({error:error.message})
    }
}