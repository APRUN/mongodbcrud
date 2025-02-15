import EditForm from "@/components/EditForm";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3001/api/topics/${id}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Failed to fetch topic: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched topic:", data);

        return data.topic || null; // ✅ Ensure it returns a valid object
    } catch (error) {
        console.error("Error fetching topic:", error);
        return null;
    }
};

export default async function editTopic({ params }) {
    const { id } = params;
    const topic = await getTopicById(id);

    if (!topic) {
        return <div className="text-red-500 font-bold">Error: Topic not found.</div>;
    }

    const { title, description } = topic;

    return (
        <>
            <EditForm id={id} title={title} description={description} />
        </>
    );
}
