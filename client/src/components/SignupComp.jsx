import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import ShowError from "../components/ShowError";
import Input from "../components/Input";
import axios from "axios";
import { Success, Failed } from "../helper/popup";
import OAuth from "../components/OAuth";
import TermsAndCondition from "./TermsAndCondition";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};
const SignupComp = () => {
  const [signState, setSignState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    touched,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      const { terms, confirmPassword, ...rest } = values;
      rest.role = signState ? "client" : "developer";

      try {
        console.log(rest);
        const res = await axios.post("/api/v1/auth/signup", rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
        console.log(data);
        action.resetForm();
        Success(data.message);
        navigate("/login");
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
      } finally {
        action.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className=" flex justify-between px-2 md:px-11 pt-2">
        <h1 className="text-xl md:text-3xl font-bold font-mono">CodeSquad</h1>
        <div className=" flex items-center">
          <p className="text-xs-custom mr-1 md:text-sm md:mr-5">
            {signState === false
              ? "Are you looking for a developer?"
              : "Are you a developer?"}
          </p>
          <p
            onClick={() => setSignState(!signState)}
            className=" text-blue-600 text-xs-custom md:text-sm hover:text-blue-900 cursor-pointer"
          >
            {signState === false ? "hire developer" : "get Work"}
          </p>
        </div>
      </div>
      <div className="  p-3  max-w-lg mx-auto  my-auto">
        <h1 className="text-black  font-thin text-lg  text-center md:text-2xl my-3">
          {signState === false
            ? "Sign up to get work"
            : "Sign up to hire developer"}
        </h1>
        <OAuth role={signState} />
        <div className="relative mt-6 mb-4 flex h-px place-items-center bg-gray-200">
          <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
            or
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm text-gray-600"
            >
              Name
            </label>
            <div className="relative">
              <Input
                identifier={"username"}
                value={values.username}
                handleChange={handleChange}
                handleBlur={handleBlur}
                inputType={"text"}
              />
              {errors.username && touched.username ? (
                <ShowError Error={errors.username} />
              ) : null}
            </div>
          </div>
          <div>
            <label for="email" className="mb-2  text-sm text-black-600">
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                identifier={"confirmPassword"}
                value={values.confirmPassword}
                handleChange={handleChange}
                handleBlur={handleBlur}
                inputType={"password"}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <ShowError Error={errors.confirmPassword} />
              ) : null}
            </div>
          </div>
          <div className="flex items-start ">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-3 max-h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-xs mb-4">
              <label
                for="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="font-medium text-primary-900 hover:underline dark:text-primary-400"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
          </div>
          {errors.terms && touched.terms ? (
            <p className=" relative bottom-3 ml-0 text-left  text-xs text-rose-600 ">
              {errors.terms}
            </p>
          ) : null}
          <button
            type="submit"
            className={`w-full rounded-lg bg-blue-500 p-2 text-center text-sm font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 hover:bg-blue-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "submiting..." : "Create an account"}
          </button>
          <p className="text-sm mb-3 font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold  text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
        <TermsAndCondition
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default SignupComp;
