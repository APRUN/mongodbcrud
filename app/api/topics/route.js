import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();

        if (!title || !description) {
            return NextResponse.json({ error: "Title and Description are required" }, { status: 400 });
        }

        await connectMongoDB();
        await Topic.create({ title, description });

        return NextResponse.json({ message: "Topic Created" }, { status: 201 });
    } catch (error) {
        console.error("POST API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request){
    await connectMongoDB();
    const topics=await Topic.find();
    return NextResponse.json({topics})
}

export async function DELETE(request) {
    const id=request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message:"Topic Deleted."},{status:200})
}

