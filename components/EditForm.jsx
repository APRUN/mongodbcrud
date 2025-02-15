"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ id, title, description }) {
    const [newtitle, setTitle] = useState(title);
    const [newdescription, setDescription] = useState(description);
    const router = useRouter(); // ✅ Corrected useRouter usage

    const handleonSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newtitle, description: newdescription }), // ✅ Corrected field names
            });

            if (!res.ok) {
                throw new Error(`Failed to update topic: ${res.status}`);
            }

            console.log("Topic updated successfully!");
            await router.push("/"); // ✅ Await for smoother navigation
        } catch (error) {
            console.error("Error updating topic:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleonSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={newtitle}
                    type="text"
                    placeholder="Topic Title"
                    className="border border-slate-500 px-8 py-2"
                />
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={newdescription}
                    type="text"
                    placeholder="Topic Description"
                    className="border border-slate-500 px-8 py-2"
                />
                <button type="submit" className="bg-green-700 text-white font-bold py-3 px-6 w-fit">
                    Update Topic
                </button>
            </form>
        </div>
    );
}
