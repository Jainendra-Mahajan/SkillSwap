// utils/useComments.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useComments(postId) {
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        if (!postId) return;
        try {
            const res = await axios.get(
                `http://localhost:3000/api/comments?postId=${postId}`,
                { withCredentials: true }
            );
            setComments(res.data?.data || []);
        } catch (err) {
            console.error("Error fetching comments", err);
            setComments([]);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return { comments, refetch: fetchComments };
}
