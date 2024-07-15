import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { bidSchema } from "../../schemas"; // Create a schema for bid validation
import ShowError from "../ShowError";
import { useDispatch } from "react-redux";
import { processFailed, processStart, updateWorkSuccess } from "../../Redux/user/userSlice"; // Adjust redux actions
import { Failed, Success } from "../../helper/popup";
import { addBid } from "../../api/service";
// import { addBid } from "../../api/service"; // Adjust API service

const initialBidValues = {
  bidAmount: "",
  deliveryTime: "",
};

const PlaceBidModal = ({ isOpen, handleClose, workId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialBidValues,
    validationSchema: bidSchema,
    onSubmit: async (values, actions) => {
      try {
        dispatch(processStart());
        const res = await addBid({ ...values, workId }); // Adjust the payload as needed
        dispatch(updateWorkSuccess(res.data.data));
        Success(res.data.message);
        actions.resetForm();
        handleClose();
      } catch (err) {
        dispatch(processFailed());
        console.log('errAtAddBid:', err);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Place a Bid Modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] mt-[78px] overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
        <h2 id="place-bid-title" className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Place a Bid
        </h2>

        <form onSubmit={formik.handleSubmit} aria-labelledby="place-bid-title">
          <div className="grid grid-cols-1 gap-6 mb-6">
           
            {/* Bid Input Section */}
            <div>
              <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Bid Amount
              </label>
              <input
                id="bidAmount"
                name="bidAmount"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bidAmount}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.errors.bidAmount && formik.touched.bidAmount && <ShowError Error={formik.errors.bidAmount} />}
            </div>
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Time in Days
              </label>
              <input
                id="deliveryTime"
                name="deliveryTime"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deliveryTime}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.errors.deliveryTime && formik.touched.deliveryTime && <ShowError Error={formik.errors.deliveryTime} />}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
              Add Bid
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PlaceBidModal;
