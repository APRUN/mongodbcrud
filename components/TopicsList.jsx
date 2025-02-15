import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3001/api/topics');

        if (!res.ok) {
            throw new Error("Failed to fetch!");
        }

        const data = await res.json();

        // Extract the array from the object
        return data.topics || [];
    } catch (error) {
        console.log("Error fetching topics:", error);
        return [];
    }
};



export default async function TopicsList() {
    const topicslist = await getTopics() || [];
    return (
        <>
            {topicslist.map((t) => (
                <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">{t.title}</h2>
                        <div>{t.description}</div>
                    </div>
                    <div className="flex gap-2 ">
                        <RemoveBtn id={t._id}/>
                        <Link href={`/editTopic/${t._id}`}><CiEdit size={24} /></Link>
                    </div>
                </div>
            ))}
        </>
    );
}