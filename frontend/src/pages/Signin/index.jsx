import { useFormik } from "formik";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import backGround from "../../assets/signin.png";
import Loading from "../../components/Loading";
import actionSignin, { actionGoogleSign } from "../../redux/actions/Signin";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.signinReducer.isLogin);
  const [active, setActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Username is required")
        .min(3, "Username must have at least 3 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must have at least 6 characters"),
    }),
    onSubmit: (user) => {
      dispatch(actionSignin(user, navigate));
    },
  });

  const handleSeePassword = () => {
    setActive(!active);
  };

  const loginGoogleSuccess = (response) => {
    dispatch(actionGoogleSign({tokenId:response.tokenId},navigate));
  };

  const loginGoogleFailed = () => {

  }

  return (
    <>
      {!loading ? (
        <div className="bg-[#f7f7f7]">
          <div className="container mx-auto w-full h-[100vh] pt-24 dark:text-black">
            <h2 className="sm:text-6xl text-5xl mb-6 text-center uppercase">
              Signin
            </h2>
            <div className=" flex items-center justify-center">
              <div className="">
                <img
                  src={backGround}
                  className="lg:w-3/4 md:w-full md:block hidden"
                  alt="sign-in"
                />
              </div>
              <form
                className="pl-4 mt-12 md:mt-0"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <label className="block w-[80px] pb-4 text-gray-500">
                    User name
                  </label>
                  <div className="relative inline-block">
                    <i className="fa-solid fa-user sign-in-icon" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Username"
                      value={formik.values.name}
                      className="input"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.errors.name && (
                    <p className="text-red-500 mt-4">*{formik.errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block w-[80px] pb-4 text-gray-500">
                    Password
                  </label>
                  <div className="relative inline-block">
                    <i className="fa-solid fa-asterisk sign-in-icon " />
                    <input
                      type={active ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={formik.values.password}
                      className="input"
                      onChange={formik.handleChange}
                    />
                    {active ? (
                      <i
                        className="fa-solid fa-eye-slash cursor-pointer position-eyes"
                        onClick={handleSeePassword}
                      />
                    ) : (
                      <i
                        className="fa-solid fa-eye cursor-pointer position-eyes"
                        onClick={handleSeePassword}
                      />
                    )}
                  </div>
                  {formik.errors.password && (
                    <p className="text-red-500 mt-4">
                      *{formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="mt-4 w-full text-center py-6">
                  <button type="submit" className="btn font-semibold">
                    Sign In
                  </button>
                </div>
                <p className="opacity-50 text-center pb-6 text-sm">
                  Or sign in with
                </p>

               <div className="text-center">
               <GoogleLogin
                  clientId={process.env.REACT_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={loginGoogleSuccess}
                  onFailure={loginGoogleFailed}
                  cookiePolicy={"single_host_origin"}
                />
               </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
