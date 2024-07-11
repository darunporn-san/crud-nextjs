import { addPost, getPosts } from "@/app/lib/data";
import connectMongoDB from "@/app/lib/mongodb";
import Posts from "@/app/models/post";
import { NextResponse } from "next/server";

export const GET =async (req:Request,res:Response) => {
    console.log("GET Request");
    try {
        await connectMongoDB()         
        const posts= await Posts.find()

        // const posts = getPosts()
        return NextResponse.json({message:"OK",posts},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{
            status:500
        });
    }
}

export const POST = async (req:Request,res:Response) => {
    console.log("POST Request");
    const {title,desc} =await req.json()
    try {
        const post = {title,desc,date:new Date(),id: Date.now().toString()}
         await connectMongoDB()         
         await Posts.create(post)
        //  addPost(post) - ถ้าไม่ได้ connect MongoDB
        return NextResponse.json({message:"OK",post},{status:200})

    } catch (error) {
        return NextResponse.json({message:"Error",error},{
            status:500
        });
    }
}
