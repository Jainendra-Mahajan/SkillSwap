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
        <div className='flex flex-col justify-center md:mx-50'>
            <HelpInputCard />
            {
                helpPosts.length > 0 && helpPosts.map((help) => (
                    <HelpCard key={help?._id} help={help} />
                ))
            }
        </div>
    )
}

export default Help