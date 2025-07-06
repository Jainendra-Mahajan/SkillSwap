import { useState } from "react";

const HelpCard = ({ help }) => {

    return (
        <div className="m-3 card bg-base-100 shadow-md border border-base-300 p-6 rounded-xl transition hover:shadow-lg">

            <div className="badge badge-primary mb-3 text-xs px-3 py-1">{help?.tag}</div>
            <h2 className="text-xl font-bold mb-2">{help.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{help.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex gap-3">
                    <button className="flex items-center gap-1 btn btn-sm btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        {help?.likes || 0}
                    </button>

                    <button className="flex items-center gap-1 btn btn-sm btn-outline">
                        💬 {help?.comments?.length || 0}
                    </button>
                </div>

                <span className="italic">👤 {help.postedBy || "Anonymous"}</span>
            </div>
        </div>
    );
};

export default HelpCard;
