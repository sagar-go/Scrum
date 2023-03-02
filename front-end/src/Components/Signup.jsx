import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import Select from "react-select";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import {
  userRegister,
  userRegisterName,
} from "../features/actions/authActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [counter, setCounter] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [show, setShow] = useState(false);
  const [data, setData] = useState(Math.floor(1000 + Math.random() * 9000));
  const [timeLeft, setTimeLeft] = useState(null);
  // const [form1Data, setForm1Data] = useState();

  let emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const form = useRef();
  // key of reducer -> authData , // initial state of slice -> name
  const getData = useSelector((state) => state?.authData?.names);

  const loadingShow = useSelector((state) => state.authData.loading);
  //setForm1Data(loadingShow);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(userRegisterName({ role: "manager" }));
  // }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
      // setCounter(null);
      // setData(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const options = [
    { value: "dev", label: "Developer" },
    { value: "manager", label: "Manager" },
  ];

  function onSubmit(values) {
    console.log(counter, "form");
    // setShow(!show);
    setTimeLeft(15);
    // emailjs
    //   .sendForm(
    //     "service_zoovp38",
    //     "template_46o8y8u",
    //     form.current,
    //     "gFyvXCI0pvgZNjxC8"
    //   )
    //   .then(
    //     (result) => {
    //       console.log("success", result.text);
    //     },
    //     (error) => {
    //       console.log("failed", error.text);
    //     }
    //   );

    const arr = getData.find((elem) => values.manager.value === elem._id);
    console.log(arr, "ooooooo");
    //return { value: _id, label: name };

    dispatch(
      userRegister({
        ...values,
        role: values.role.value,
        manager: arr,
      })
    ).then(
      (e) => {
        if (e.payload.data.success === false) {
          toast.error(e?.payload?.data?.message);
        } else {
          toast.success(e?.payload?.data?.message);
          setShow(!show);
        }
      }
      // toast.success(e?.payload?.data?.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // })
    );
  }

  const registeredName = () => {
    if (getData && getData.length > 0) {
      const options = getData?.map(({ _id, name }) => {
        return { label: name, value: _id };
      });
      return options;
    }
  };

  function onSubmit2(values) {
    console.log("called", values);
    if (
      values.otp === JSON.stringify(counter) ||
      values.otp === JSON.stringify(data)
    ) {
      console.log("called otp match");
      //  dispatch(userRegister(form1Data)).then((e) => console.log(e, "www"));
      // toast.success("valid otp");
      navigate("/login");
    } else {
      console.log("otp not matched");
      toast.error("invalid otp");
    }
  }

  function onSubmit3() {
    console.log(data, "ddd");

    setTimeLeft(15);

    emailjs
      .sendForm(
        "service_zoovp38",
        "template_46o8y8u",
        form.current,
        "gFyvXCI0pvgZNjxC8"
      )
      .then(
        (result) => {
          console.log("success", result.text);
        },
        (error) => {
          console.log("failed", error.text);
        }
      );
  }

  return (
    <div>
      <h2>Sign up</h2>

      {!show ? (
        <>
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
              // if (!values.registeredName) {
              //   error.registeredName = "select your name";
              // }
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
                            dispatch(
                              userRegisterName({
                                role: "manager",
                              })
                            );
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
                            options={registeredName()}
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
                  <Field name="generateotp">
                    {({ input }) => (
                      <div>
                        <input
                          {...input}
                          type="number"
                          placeholder="otp"
                          value={counter}
                          hidden
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <button type="submit">Submit</button>
              </form>
            )}
          />
          {loadingShow === true && <p>Loading..</p>}
        </>
      ) : (
        <>
          <div>
            <Form
              onSubmit={onSubmit2}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} ref={form}>
                  <Field name="otp">
                    {({ input, meta }) => (
                      <div>
                        <label>OTP: </label>
                        <input {...input} type="number" placeholder="otp" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="generateotp">
                    {({ input }) => (
                      <div>
                        <input
                          {...input}
                          type="number"
                          placeholder="otp"
                          value={counter}
                          hidden
                        />
                      </div>
                    )}
                  </Field>

                  <button type="submit"> send</button>
                </form>
              )}
            />
          </div>
          {<h3>{timeLeft}</h3>}
          {!timeLeft && (
            <Form
              onSubmit={onSubmit3}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} ref={form}>
                  <Field name="generateotp">
                    {({ input }) => (
                      <div>
                        <input {...input} type="number" value={data} hidden />
                        <button type="submit">Resend otp</button>
                      </div>
                    )}
                  </Field>
                </form>
              )}
            />
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Signup;
