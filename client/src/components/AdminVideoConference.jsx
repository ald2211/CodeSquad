import React, { useState } from "react";
import { useFormik } from "formik";
import Sidebar from "./AdminSidebar";
import Input from "../components/Input"; // Assume you have an Input component
import ShowError from "../components/ShowError"; // Assume you have a ShowError component
import { videoConferenceInputSchema } from "../schemas";
import { useSelector } from "react-redux";

const initialValues = {
  name: "",
  workNumber: "",
};
const AdminVideoConference = () => {
  const { currentUser } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues,
    validationSchema: videoConferenceInputSchema,
    onSubmit: (values, actions) => {
      window.open(
        `/room/${values.workNumber.toLowerCase()}/${currentUser.data._id}/${
          values.name
        }`,
        "_blank"
      );
      actions.setSubmitting(false);
    },
  });

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;

  return (
    <>
      <div className="flex flex-row mt-20 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6 overflow-x-auto">
          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <div className="flex justify-between items-center p-4 bg-white">
              <h1 className="text-2xl font-semibold text-gray-900">
                Video Conference
              </h1>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-4">
                Join Conference Room
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input
                    identifier="name"
                    value={values.name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    inputType="text"
                    placeholder="Enter your name"
                  />
                  {errors.name && touched.name ? (
                    <ShowError Error={errors.name} />
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="workNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Number
                  </label>
                  <Input
                    identifier="workNumber"
                    value={values.workNumber}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    inputType="text"
                    placeholder="Enter your work number"
                  />
                  {errors.workNumber && touched.workNumber ? (
                    <ShowError Error={errors.workNumber} />
                  ) : null}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Join"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminVideoConference;
