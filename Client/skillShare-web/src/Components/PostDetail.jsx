import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'

const PostDetail = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState();

    const fetchPost = async () => {

        try {
            const res = await axios.get(`http://www.localhost:3000/api/${type}/${id}`, { withCredentials: true })
            setPost(res?.data?.data);
        }
        catch (error) {
            console.log("Error Fetching Post", error);
        }
    }

    useState(() => {
        fetchPost();

    }, [])
    if (!post) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <div className="card bg-base-100 shadow-xl p-6 space-y-4">
                <button onClick={() => navigate(-1)} className="btn btn-sm w-fit">
                    ← Back
                </button>

                <div className="badge badge-secondary badge-outline text-sm px-3 py-1">
                    {post.tag}
                </div>

                <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>

                <p className="text-sm text-gray-500">
                    👤 {post.postedBy || "Anonymous"}
                </p>

                <p className="text-base text-gray-700 whitespace-pre-wrap">
                    {post.description}
                </p>

                <div className="flex gap-4 text-sm text-gray-600 mt-4">
                    <div className="btn btn-outline btn-sm gap-1">
                        ❤️ {post.likes || 0}
                    </div>
                    <div className="btn btn-outline btn-sm gap-1">
                        💬 {post.comments?.length || 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail