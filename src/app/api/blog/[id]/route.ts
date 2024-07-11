import { deletePost, getById, updatePost } from "@/app/lib/data";
import connectMongoDB from "@/app/lib/mongodb";
import Posts from "@/app/models/post";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: any) => {
  console.log("GET By ID Request");
  // const id = req.url.split("blog/")[1];
  const { id } = params;

  console.log("id", id);
  try {
    // const post = getById(id);
    await connectMongoDB();

    const post = await Posts.findOne({_id: id})
    if (!post) {
      return NextResponse.json(
        { message: "Error" },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json({ message: "OK", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req: Request, { params }: any) => {
  console.log("POST By ID Request");

  const { id } = params;
  try {
    const { title, desc } = await req.json();
    // console.log('id',id)
    await connectMongoDB();
    await Posts.findByIdAndUpdate(id, { title, desc });
    // const id = req.url.split("blog/")[1];
    // updatePost(id, title, desc);
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: Request,{ params }: any) => {
  console.log("DELETE By ID Request");
  const { id } = params;

  try {
    // const id = req.url.split("blog/")[1];
    // console.log('DELETE',req.url.pa)
    await connectMongoDB();
    await Posts.findByIdAndDelete(id);
    // deletePost(id)
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
