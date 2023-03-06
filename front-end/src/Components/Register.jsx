import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegister } from "../features/actions/authActions";
import OtpVerify from "./OtpVerify";

const Register = () => {
  //  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOtp = useSelector((state) => state?.authData?.otpMessage);
  console.log(getOtp, "ddddddddddd");

  const form = useRef();

  const options = [
    { value: "dev", label: "Developer" },
    { value: "manager", label: "Manager" },
  ];

  useEffect(() => {
    if (getOtp.success === false) {
      toast.info(getOtp?.message);
    }
    if (getOtp.success === true) {
      toast.success(getOtp?.message);
      setShow(!show);
    }
  }, [getOtp]);

  function onSubmit(values) {
    // navigate("/login");
    dispatch(
      userRegister({
        ...values,
        role: values.role.value,
      })
    );
  }

  return (
    <>
      <div>
        <h2>Register</h2>

        <div>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              const error = {};
              if (!values.name) {
                error["name"] = "name required!";
              }
              if (!values.email) {
                error["email"] = "email required!";
              }
              // if (!emailRegex.test(values.email)) {
              //   error["email"] = "You have entered an invalid email address!";
              // }
              // if (!passwordRegex.test(values.password)) {
              //   error["password"] =
              //     "password should have small char, Capital char, @ , number";
              // }

              if (!values.password) {
                error["password"] = "password required!";
              }
              if (!values.role) {
                error.role = "select your role";
              }

              return error;
            }}
            render={({ handleSubmit, values, form: { change } }) => (
              <form onSubmit={handleSubmit} ref={form}>
                <Field name="name">
                  {({ input, meta }) => (
                    <div>
                      <label>Name: </label>
                      <input {...input} type="text" placeholder="name" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div>
                  <Field name="email">
                    {({ input, meta }) => (
                      <div>
                        <label>Email: </label>
                        <input {...input} type="text" placeholder="email" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
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
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="select">
                  <Field name="role">
                    {({ input, meta }) => (
                      <div>
                        <Select
                          {...input}
                          placeholder="select your role"
                          options={options}
                          onChange={(e) => {
                            input.onChange(e);
                            //   dispatch(
                            //     userRegisterName({
                            //       role: "manager",
                            //     })
                            //   );
                          }}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                {values.role && values.role.value === "manager" && (
                  <div className="select">
                    <Field name="manager">
                      {({ input, meta }) => (
                        <div>
                          <Select
                            {...input}
                            placeholder="select your name"
                            // options={registeredName()}
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                )}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
      <div>
        <div>
          <OtpVerify show={show} />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
