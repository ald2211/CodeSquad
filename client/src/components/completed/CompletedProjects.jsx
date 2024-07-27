import React, { useEffect, useState } from 'react';
import { getAllCompletedProjects, handleReview, handleUpi, makePayment, verifyPayment } from '../../api/service';
import spinner from '../../assets/loader.gif';
import { TbHourglassEmpty } from "react-icons/tb";
import SearchBar from '../Home/SearchBar';
import Pagination from '../UserTablePagination';
import { useSelector } from 'react-redux';
import { Success } from '../../helper/popup';
import PaymentSuccess from '../PaymentSuccess';
import PaymentFailed from '../PaymentFailed';
import PaymentIdCard from '../PaymentIdCard';

const CompletedProjects = () => {
    const [completed, setCompleted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [totalItems, setTotalItems] = useState(0); 
    const [showPaymentField, setShowPaymentField] = useState(false);
    const [upiId, setUpiId] = useState("");
    const [rating, setRating] = useState();
    const [review, setReview] = useState("");
    const [upiError,setUpiError]=useState('')
    const [ratingError,setRatingError]=useState('')
    const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false);
    const [paymentFailedOpen, setPaymentFailedOpen] = useState(false);
    const itemsPerPage = 10;
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getCompletedProjects = async () => {
            try {
                let res = await getAllCompletedProjects(currentPage, itemsPerPage, search);
                const { data, totalPages, totalItems } = res.data;
               
                setCompleted(data);
                setTotalPages(totalPages);
                setTotalItems(totalItems);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
                console.log('completedErr:', err);
            } finally {
                setLoading(false);
            }
        };
        getCompletedProjects();
    }, [currentPage, itemsPerPage, search]);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleToggle = () => {
        setShowPaymentField(!showPaymentField);
    };
    const handleRequestPayment = async(paymentId, key) => {
        try {
            // Regex pattern for UPI ID
            const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
            if (!upiRegex.test(upiId)){
                setUpiError('invalid UPI ID')
                return;
            }
            setShowPaymentField(!showPaymentField)
            const res = await handleUpi(paymentId, upiId);
            
            if (res.data.success) {
                const updatedWorkData = [...completed];
                updatedWorkData[key].paymentId.upi = res.data.data;
                setCompleted(updatedWorkData);
                Success(res.data.message);
            }
        } catch (err) {
            console.log('err at upi:', err);
        }
    };

   

    const handleSubmitReview = async(clientId,developerId,workId,key) => {
        let role = currentUser.data.role;
        let userId,reviewer;
        if(role==='client'){
            userId=developerId
            reviewer=clientId
        }else{
            userId=clientId,
            reviewer=developerId
        }
        let reviewData={
            userId,
            reviewer,
            rating,
            review
        }

        try {
            // Regex pattern for rating
            const ratingRegex = /^(?:[1-5])$/;
            if (!ratingRegex.test(rating)){
                setRatingError('Please enter a rating between 1 and 5')
                return;
            }
            const res = await handleReview(reviewData,workId);
            
            if (res.data.success) {
                 const updatedWorkData = [...completed];
                 if(role==='client'){
                    updatedWorkData[key].clientReview = 'reveiw added';
                 }else{
                    updatedWorkData[key].developerReview = 'reveiw added';
                 }
               
                setCompleted(updatedWorkData);
                 Success(res.data.message);
            }
        } catch (err) {
            console.log('err at review:', err);
        }
    };

    const handlePayment = async (amount, paymentId, key) => {
        const currency = 'INR';
        const res = await makePayment(amount, currency, paymentId);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_ID_KEY,
            order_id: res.data.order.id,
            image: 'http://localhost:5173/codeSquadLogo.png',
            handler: async function(response) {
                const res = await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, paymentId);
                if (res.data.success) {
                    const updatedWorkData = [...completed];
                    updatedWorkData[key].paymentId.clientPayment = "received";
                    updatedWorkData[key].paymentId.razorpayPaymentId = res.data.paymentData.razorpayPaymentId;
                    setCompleted(updatedWorkData);
                    setPaymentSuccessOpen(true);
                } else {
                    setPaymentFailedOpen(true);
                }
            },
            prefill: {
                name: 'CodeSquad',
                email: import.meta.env.VITE_RAZORPAY_EMAIL,
                contact: import.meta.env.VITE_RAZORPAY_NUMBER
            },
            theme: {
                color: '#F37254'
            }
        }
        const rzpi = new window.Razorpay(options);
        rzpi.open();
    }

    return (
        <div className="max-w-6xl mx-auto pt-3 space-y-6 mt-[90px] mb-2">
            <SearchBar setSearch={setSearch} />

            {loading ? (
                <div className="flex items-center justify-center h-screen bg-white">
                    <img src={spinner} alt="Loading" className="w-16 h-16 animate-spin mb-32" />
                </div>
            ) : completed?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[380px] text-center">
                    <TbHourglassEmpty className="w-12 h-12 text-gray-500" />
                    <p className="text-gray-600">No committed projects found</p>
                </div>
            ) : (
                completed.map((work, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Project Details */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{work.workName} <span className='text-sm font-normal ml-1'>({work.workNumber.toUpperCase()})</span></h2>
                                    <div className={`rounded-lg px-3 py-1 text-xs font-bold uppercase text-white ${
                                        work.workStatus === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                                    }`}>
                                        {work.workStatus}
                                    </div>
                                </div>
                                
                                <div className="flex items-center mb-4">
                                    <img
                                        src={work.clientId.avatar}
                                        alt="Client profile"
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
                                        src={work.bids.find((dev) => dev.developer === work.developerId)?.developerPhoto}
                                        alt="Developer profile"
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {work.bids.find((dev) => dev.developer === work.developerId)?.developerName}
                                        </h3>
                                        <p className="text-gray-600 text-sm">Developer</p>
                                    </div>
                                
                                </div>
                                <p className="text-gray-600 ">Type: {work.workType}</p>
                                <p className="text-gray-600 ">Delivered in {work.bids.find((dev) => dev.developer === work.developerId)?.deliveryTime} Days</p>
                                <p className="text-gray-600 ">Budget: ₹{work.budget}</p>
                            </div>
                            
                            {/* Payment Details */}
                            <div>
                                {
                                    currentUser.data.role==='developer'?
                                    <p className={`rounded-lg px-3 py-1 text-xs font-bold uppercase text-white text-center ${
                                        work.paymentId?.developerPayment === 'Completed' ? 'bg-green-500' :work.paymentId.developerPayment==='initiated'?'bg-orange-500': 'bg-yellow-500'
                                    }`}>Payment {work.paymentId?.developerPayment}</p>
                                    :
                                    <p className={`rounded-lg px-3 py-1 text-xs font-bold uppercase text-white text-center ${
                                        work.paymentId?.clientPayment === 'recieved' ? 'bg-green-500': 'bg-yellow-500'
                                    }`}>Payment {work.paymentId?.clientPayment}</p>
                                }
                                <p className="text-gray-600 mt-2">Bid Amount: ₹{work.bids.find((dev) => dev.developer === work.developerId)?.bidAmount}</p>
                                <p className="text-gray-600">Total Amount: ₹{work.paymentId?.finalAmount}</p>
                               {
                                currentUser.data.role==='developer'&&
                                <>
                                 {work.paymentId.upi&&<p className='text-black mt-2 font-semibold '>your UPI ID is {work.paymentId?.upi}</p>}
                                <div className="mt-4">
                                    <button
                                        className="w-full bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600 focus:outline-none transition duration-300"
                                        onClick={handleToggle}
                                    >
                                        {showPaymentField ? 'Hide' : 'Update UPI'}
                                    </button>

                                    <div className={`transition-all duration-500 ease-in-out ${showPaymentField ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                        <input
                                            type='text'
                                            className="w-full border border-gray-300 rounded-md p-2 mb-2 mt-2"
                                            placeholder="UPI ID"
                                            onChange={(e) => {setUpiId(e.target.value);setShowError('')}}
                                        />
                                       { upiError!==''&&<p className='text-sm text-red-600 mb-[5px]'>{upiError}</p>}
                                        <button
                                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none transition duration-200"
                                            onClick={() => handleRequestPayment(work.paymentId, index)}
                                        >
                                            update UPI
                                        </button>
                                    </div>
                                </div>
                                </>
                               }
                               {
                               ( currentUser.data.role==='client'&&work.paymentId.clientPayment === 'pending')
                                     ? (
                                        <button
                                            onClick={() => handlePayment(work.paymentId.finalAmount, work.paymentId._id, index)}
                                            className="w-full bg-indigo-500 mt-3 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none transition duration-200"
                                        >
                                            Make Payment
                                        </button>
                                    )
                                    :
                                    <PaymentIdCard paymentId={work.paymentId.razorpayPaymentId} />
                                
                               }
                            </div>
                        </div>

                        {/* Review Section */}
                       { 
                        (currentUser.data.role==='client'&&work.clientReview)?
                        <p></p>
                        :
                        (currentUser.data.role==='developer'&&work.developerReview)?
                        <p></p>
                        :
                        <div className="p-6">
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                placeholder="Write a review..."
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                placeholder="Rating (1-5)"
                                min='1'
                                max='5'
                                onChange={(e) => setRating(e.target.value)}
                               
                            />
                            { ratingError!==''&&<p className='text-sm text-red-600 mb-[5px]'>{ratingError}</p>}
                            <button
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-200"
                                onClick={() => handleSubmitReview(work.clientId._id,work.developerId,work.workNumber,index)}
                            >
                                Submit Review
                            </button>
                        </div>}
                    </div>
                ))
            )}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
             {/* Payment Success and failure popup */}
             {currentUser.data.role === 'client' &&
                <>
                    <PaymentSuccess isOpen={paymentSuccessOpen} onClose={() => setPaymentSuccessOpen(false)} />
                    <PaymentFailed isOpen={paymentFailedOpen} onClose={() => setPaymentFailedOpen(false)} />
                </>
            }
        </div>
    );
};

export default CompletedProjects;
