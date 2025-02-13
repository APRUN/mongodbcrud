import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="flex justify-between px-8 py-3 bg-slate-900 items-center">
            <Link href={"/"} className="text-white">Chief Oggy</Link>
            <Link href={"/addTopic"} className="bg-white p-2">Add Topic</Link>
        </nav>
    );
}