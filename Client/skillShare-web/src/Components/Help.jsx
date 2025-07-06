import React, { useEffect, useState } from 'react'
import HelpInputCard from './HelpInputCard'
import axios from 'axios';
import HelpCard from './HelpCard';

const Help = () => {
    const [helpPosts, setHelpPosts] = useState([]);

    const fetchHelpPost = async () => {
        try {
            const res = await axios.get("http://www.localhost:3000/api/help", {
                withCredentials: true,
            });
            setHelpPosts(res?.data?.data);
        } catch (error) {
            console.error("Failed to fetch Help Queries:", error);
        }
    };


    useEffect(() => {
        fetchHelpPost();
    }, [])

    return (

        <div>
            <HelpInputCard />
            <div className="mt-10 space-y-5 max-w-2xl mx-auto">
                {helpPosts.map((help) => (
                    <HelpCard key={help._id} help={help} />
                ))}
            </div>
        </div>
    )
}

export default Help