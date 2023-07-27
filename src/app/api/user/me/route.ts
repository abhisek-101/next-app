import { getDataFromToken } from "@/helpers/getDataFromToken"
import { NextRequest ,NextResponse} from "next/server"
import User from "@/models/userModel"
import { connect } from "@/dbconfig/dbconfig"

connect()

export const GET = async(request:NextRequest)=>{

    try{
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password")

        console.log(user)
        return NextResponse.json({message:"User with ${userId} fetched successfully", success:true,user},{status:200})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400})
    }
}