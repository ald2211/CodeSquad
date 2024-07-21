import React, { useEffect, useState } from 'react';
import { getAllCommittedProjects } from '../../api/service';
import spinner from '../../assets/loader.gif';
import { TbHourglassEmpty } from "react-icons/tb";

const CommittedProjects = () => {
    const [committed, setCommitted] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCommittedProjects = async () => {
            try {
                let res = await getAllCommittedProjects();
                setCommitted(res.data.data);
            } catch (err) {
                console.log('committedErr:', err);
            } finally {
                setLoading(false);
            }
        };
        getCommittedProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[640px] bg-white">
                <img src={spinner} alt="Loading" className="w-16 h-16 animate-spin" />
            </div>
        );
    }

    if (committed?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center ">
                <TbHourglassEmpty className='w-12 h-12'/>
                <p className="text-gray-600">You have no committed projects</p>
            </div>
        );
    }
    return (
        <div className="max-w-6xl  mb-12 mx-auto pt-11  space-y-6 mt-[90px]">
            {committed.map((work, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800">{work.workName}</h2>
                        <p className="text-gray-600">Type: {work.workType}</p>
                        <p className="text-gray-600">Budget: ${work.budget}</p>
                        <div className="flex justify-between items-center mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                Video Call
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
                                Chat
                            </button>
                        </div>
                        <div className="mt-6">
                            <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none">
                                Continue
                            </button>
                            <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">
                                withdraw
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommittedProjects;
