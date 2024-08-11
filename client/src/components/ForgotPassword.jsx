import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../api/service';
import { Success } from '../helper/popup';
import { forgotPasswordSchema } from '../schemas';

const ForgotPasswordModal = ({ isOpen, onClose }) => {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema:forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await forgotPassword(values.email);
        Success(res.data.message);
      } catch (err) {
        console.log('Error:', err);
      } finally {
        setSubmitting(false);
        resetForm(); 
        onClose();  
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-md${
                formik.isSubmitting ? " cursor-not-allowed rounded-md" : ""
              }`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
