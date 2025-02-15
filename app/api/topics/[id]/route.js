import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        await connectMongoDB();
        const { id } = params;
        
        // ✅ Correctly parse JSON body
        const { title, description } = await request.json();

        // ✅ Validate input
        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required!" }, { status: 400 });
        }

        // ✅ Find and update topic
        const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedTopic) {
            return NextResponse.json({ error: "Topic not found!" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic Updated", topic: updatedTopic }, { status: 200 });
    } catch (error) {
        console.error("Error updating topic:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        await connectMongoDB();
        const { id } = params;

        // ✅ Find topic
        const topic = await Topic.findById(id);

        if (!topic) {
            return NextResponse.json({ error: "Topic not found!" }, { status: 404 });
        }

        return NextResponse.json({ topic }, { status: 200 });
    } catch (error) {
        console.error("Error fetching topic:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
