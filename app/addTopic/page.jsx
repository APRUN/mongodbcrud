"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function addTopic() {        

    const router=useRouter();
    const [title, setTitle]=useState('');
    const [description, setDescription]=useState('');

    const handleonSubmit=async(e)=>{
        e.preventDefault();

        if(!title || !description){
            alert("Missing Title or Description.")
            return;
        }
        try {
            const res=await fetch('http://localhost:3001/api/topics',{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({title, description}),
            });

            if(res.ok){
                router.push("/")
            }
            else{
                console.log("Error to push to home")
            }


        } catch (error) {
            console.log("Error", error)
        }
    }

    return(
        <div>
            <form onSubmit={handleonSubmit} className="flex flex-col gap-3">
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder="Topic Title" className="border border-slate-500 px-8 py-2"/>
                <input onChange={(e)=>setDescription(e.target.value)} value={description} type="text" placeholder="Topic Description" className="border border-slate-500 px-8 py-2"/>
                <button type="submit" className="bg-green-700 text-white font-bold py-3 px-6 w-fit">Add Topic</button>
            </form>
        </div>
    );
};
