import React, { useState } from 'react'
import axios from "axios"

const HelpInputCard = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [showToast, setShowToast] = useState(false)
    const [showSuccessToast, setShowSuccessToast] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || title.length < 6 || !description.trim() || description.length < 10) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }


        try {
            await axios.post("http://localhost:3000/api/help", {
                title, description, tag
            }, { withCredentials: true })

            setShowSuccessToast(true)

            setTimeout(() => setShowSuccessToast(false), 3000);
            setTitle("");
            setDescription("");
            setTag("");

        } catch (error) {
            console.error("Error submitting help request:", error);
            alert("Something went wrong. Please try again.");
        }

    }

    return (
        <>
            <div className="toast toast-top toast-center">
                {showToast && <div className="alert alert-info">
                    <span>Title should contain at 5 Characters and Description Should contain at least 10 characters</span>
                </div>}
            </div>

            <div className="toast toast-top toast-center">
                {showSuccessToast && <div className="alert alert-success">
                    <span>Help request submitted successfully</span>
                </div>}
            </div>

            <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Need Help with Something ?
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                            Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                autoComplete="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                    </div>

                    <div>
                        <label htmlFor="tag" className="block text-sm/6 font-medium text-gray-900">
                            Tags
                        </label>
                        <div className="mt-2">
                            <input
                                id="tags"
                                name="tag"
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                autoComplete="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Description" className="block text-sm/6 font-medium text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="Description"
                                name="Description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={`What's Confusing You ?`}
                                autoComplete="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className='mt-5 mb-5'>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit Help Request
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default HelpInputCard