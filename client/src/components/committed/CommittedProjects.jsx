import React, { useEffect, useState } from 'react';
import { getAllCommittedProjects, makePayment, verifyPayment } from '../../api/service';
import spinner from '../../assets/loader.gif';
import { TbHourglassEmpty } from "react-icons/tb";
import SearchBar from '../Home/SearchBar';
import Pagination from '../UserTablePagination';
import { useSelector } from 'react-redux';
import { Failed, Success } from '../../helper/popup';

const CommittedProjects = () => {
    const [committed, setCommitted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [totalItems, setTotalItems] = useState(0); 
    const itemsPerPage = 10;
    const {currentUser}=useSelector((state)=>state.user)

    useEffect(() => {
        const getCommittedProjects = async () => {
            try {
                let res = await getAllCommittedProjects(currentPage, itemsPerPage, search);
                const { data, totalPages, totalItems } = res.data;
                console.log('daaa:',res.data)
                setCommitted(data);
                setTotalPages(totalPages);
                setTotalItems(totalItems);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
                console.log('committedErr:', err);
            } finally {
                setLoading(false);
            }
        };
        getCommittedProjects();
    }, [currentPage, itemsPerPage, search]);
    
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handlePayment=async(amount,paymentId,key)=>{
        const currency = 'INR';
        const res=await makePayment(amount, currency, paymentId);

        const options={
            key:import.meta.env.VITE_RAZORPAY_ID_KEY,
            order_id:res.data.order.id,
            image:'http://localhost:5173/codeSquadLogo.png',
            handler:async function(response){
                const res=await verifyPayment(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature,paymentId)
                if(res.data.success){
                    const updatedWorkData = [...committed];
                    updatedWorkData[key].paymentId.clientPayment = "recieved";
                    setCommitted(updatedWorkData)
                    Success('payment recieved')
                }else{
                    Failed('payment failed')
                }
            },
            prefill:{
                name:'CodeSquad',
                email:import.meta.env.VITE_RAZORPAY_EMAIL,
                contact:import.meta.env.VITE_RAZORPAY_NUMBER
            },
            theme:{
                color:'#F37254'
            }
        }
        const rzpi=new window.Razorpay(options)
        rzpi.open()
    }

    return (
        <div className="max-w-6xl  mx-auto pt-3 space-y-6 mt-[90px] mb-2">
            <SearchBar setSearch={setSearch} />

            {loading ? (
                <div className="flex items-center justify-center h-screen bg-white">
                    <img src={spinner} alt="Loading" className="w-16 h-16 animate-spin mb-32" />
                </div>
            ) : committed?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[380px] text-center">
                    <TbHourglassEmpty className="w-12 h-12" />
                    <p className="text-gray-600"> no committed projects</p>
                </div>
            ) : (
                committed.map((work, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{work.workName}<span className='text-sm font-normal ml-3'>({work.workNumber.toUpperCase()})</span></h2>
                                <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200">
                                    {work.workStatus}
                                </div>
                            </div>
                            
                                {
                                    currentUser.data.role==='client'&&
                                    <div className={`rounded-lg text-center px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 ${work.paymentId.clientPayment==='recieved'?'bg-green-500':'bg-yellow-500'}`}>
                                    Payment {work.paymentId.clientPayment.toUpperCase()}
                                </div>
                                }
                  
                            
                            <div className="flex justify-between mt-7">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={work.clientId.avatar}
                                        alt="Client profile picture"
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {work.clientId.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">Client</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <img
                                        src={work.bids.filter((dev) => dev.developer === work.developerId)[0].developerPhoto}
                                        alt="Developer profile picture"
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {work.bids.filter((dev) => dev.developer === work.developerId)[0].developerName}
                                        </h3>
                                        <p className="text-gray-600 text-sm">Developer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-gray-600">Type: {work.workType}</p>
                                <p className="text-gray-600">Delivery Time: {work.bids.filter((dev) => dev.developer === work.developerId)[0].deliveryTime} Days</p>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-gray-600">Budget: ₹{work.budget}</p>
                                <p className="text-gray-600">Bid Amount: ₹{work.bids.filter((dev) => dev.developer === work.developerId)[0].bidAmount}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4 mb-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-200">
                                    Video Call
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200">
                                    Chat
                                </button>
                            </div>
                            <div className="mt-6">
    {currentUser.data.role === 'developer' ? (
        <>
            <input type="file" className="w-full mb-4 border border-gray-300 rounded-md p-2" />
            <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none transition duration-200">
                Inform Complete
            </button>
        </>
    ) : (
        work.paymentId.clientPayment === 'pending' && (
            <button
                onClick={() => handlePayment(work.paymentId.finalAmount, work.paymentId._id,index)}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none transition duration-200"
            >
                Make Payment
            </button>
        )
    )}
</div>

                        </div>
                    </div>
                ))
            )}
             <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
        </div>
    );
};

export default CommittedProjects;
