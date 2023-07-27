import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";

connect()

export const POST = async (request:NextRequest)=>{

    try{
        
        const reqBody = await request.json()
        const {token} = reqBody;

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt : Date.now()}})

        if(!user){
            return NextResponse.json({message:"Invalid Token. User not found"})
        }
        console.log(user)
        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message:"User email verified successfully",
            success:true,
        },{status:200})

    }catch(error:any){
        return NextResponse.json({message:error.message},{status:500});
    }
}