import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { userLogin } from "../features/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginDetails = useSelector((state) => state?.authData?.loginData);
  const errorMessage = useSelector((state) => state?.authData?.loginErrMsg);

  function onSubmit(values) {
    dispatch(userLogin(values));

    if (userLoginDetails?.success === true) {
      localStorage.setItem("auth-token", userLoginDetails?.token);
      // toast.success("success");
      navigate("/user");
    } else {
      // if (errorMessage) {
      toast.error(errorMessage);
      //}
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <div>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const error = {};
            if (!values.email) {
              error["email"] = "email required!";
            }
            if (!values.password) {
              error["password"] = "password required!";
            }
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <label>Email: </label>
                    <input {...input} type="text" placeholder="email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label>Password: </label>
                      <input
                        {...input}
                        type="password"
                        placeholder="password"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <button type="submit">Login</button>
            </form>
          )}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
