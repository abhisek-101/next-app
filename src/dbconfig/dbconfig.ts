import mongoose from "mongoose";
import { connected } from "process";

export const connect = async() =>{

    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("mongodb connected successfully")
        })

        connection.on('error',(err)=>{
            console.log("Mongodb connection error. Please make sure mongodb is running "+err)
            process.exit()
        })

    }catch(error){
        console.log("something went wrong....");
        console.log(error);
    }

}
