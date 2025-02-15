'use client';

import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";



export default function RemoveBtn({ id }) {

    const router = new useRouter();

    const removeTopic = async () => {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const res = await fetch(`http://localhost:3001/api/topics?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
        <div onClick={removeTopic}><RiDeleteBin6Line size={24} className="text-red-600" /></div>
    );
}