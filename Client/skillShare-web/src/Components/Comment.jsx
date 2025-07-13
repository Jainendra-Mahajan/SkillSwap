import axios from "axios";
import React, { useState } from "react";

const Comment = ({ postId, comments, refetch }) => {

    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (comment.trim().length < 5) return;

        try {
            await axios.post(
                "http://localhost:3000/api/comments",
                { postId, comment },
                { withCredentials: true }
            );

            setComment("");
            refetch();
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };
    if (comments === null) {
        return <p className="text-center text-gray-400">Loading comments…</p>;
    }

    return (
        <div className="mt-8 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">💬 Comments</h3>

            <div className="space-y-4 mb-6">
                {comments.length ? (
                    comments.map((c) => (
                        <div
                            key={c._id}
                            className="border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50"
                        >
                            <p className="text-sm text-gray-700">{c.comment}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                — {c.postedBy || "Anonymous"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No comments yet. Be the first!</p>
                )}
            </div>

            <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
            />
            <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
                Post Comment
            </button>
        </div>
    );
};

export default Comment;
