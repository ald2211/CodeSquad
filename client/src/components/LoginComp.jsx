import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import Input from "../components/Input";
import ShowError from "../components/ShowError";
import { Success, Failed } from "../helper/popup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../api/service";
import {
  processFailed,
  processStart,
  signinSuccess,
} from "../Redux/user/userSlice";
import spinner from "../assets/loader.gif";
import OAuth from "../components/OAuth";
import ForgotPasswordModal from "./ForgotPassword";

const LoginComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.user);

  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleSubmit, touched, handleChange } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          dispatch(processStart());
          const response = await userLogin(values);

          if (response.success) {
            const data = response.data;

            localStorage.setItem("accessToken", data.accessToken);
            action.resetForm();
            dispatch(signinSuccess(data));
            navigate("/home");
            Success(data.message);
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          dispatch(processFailed());
        }
      },
    });

  return (
    <div className="mb-40">
      {!loading ? (
        <>
          <div className=" flex justify-between px-2 md:px-11 pt-2">
            <h1 className="text-xl md:text-3xl font-bold font-mono">
              CodeSquad
            </h1>
          </div>
          <div className="  p-3  max-w-lg mx-auto  my-auto">
            <h1 className="text-black  font-thin text-lg  text-center md:text-2xl my-3">
              Login to CodeSquad
            </h1>
            <OAuth />
            <div className="relative mt-6 mb-4 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                or
              </div>
            </div>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-2  text-sm text-black-600">
                  Email address
                </label>
                <div className="relative">
                  <Input
                    identifier={"email"}
                    value={values.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    inputType={"email"}
                  />
                  {errors.email && touched.email ? (
                    <ShowError Error={errors.email} />
                  ) : null}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-gray-600"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    identifier={"password"}
                    value={values.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    inputType={"password"}
                  />
                  {errors.password && touched.password ? (
                    <ShowError Error={errors.password} />
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-7 rounded-lg bg-blue-500 p-2 text-center text-sm font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 hover:bg-blue-700"
              >
                Sign In
              </button>
              <div className="flex justify-between">
                <p className="text-sm mb-3 font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="font-semibold  text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
                <p
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm mb-3 font-normal text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>
            </form>
            <ForgotPasswordModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-screen flex items-center justify-center">
            <img className="w-[60px]" src={spinner} alt="spinner" />
          </div>
        </>
      )}
    </div>
  );
};

export default LoginComp;
