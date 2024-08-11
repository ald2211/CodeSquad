import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPassword } from '../api/service';
import { Success } from '../helper/popup';
import { resetPasswordSchema } from '../schemas';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await resetPassword(token, values.newPassword);

        if (response.data.success) {
          Success('Password changed successfully');
          resetForm(); // Reset the form after successful submission
        }
      } catch (error) {
        console.log('error:',error)
        
      } finally {
        setSubmitting(false); // Ensure this is after form reset
        navigate('/login');
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              {...formik.getFieldProps('newPassword')}
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm ${
                formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : ''
              }`}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="Confirm new password"
              {...formik.getFieldProps('confirmNewPassword')}
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm ${
                formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? 'border-red-500' : ''
              }`}
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmNewPassword}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
