export default function addTopic() {
    return(
        <div>
            <form action="" className="flex flex-col gap-3">
                <input type="text" placeholder="Topic Title" className="border border-slate-500 px-8 py-2"/>
                <input type="text" placeholder="Topic Description" className="border border-slate-500 px-8 py-2"/>
                <button className="bg-green-700 text-white font-bold py-3 px-6 w-fit">Add Topic</button>
            </form>
        </div>
    );
};
