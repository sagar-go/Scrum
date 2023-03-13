import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  userRegister,
  userRegisterName,
} from "../features/actions/authActions";
import { Button, Col, Container, Row } from "react-bootstrap";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state?.authData?.names);
  const getOtp = useSelector((state) => state?.authData?.otpMessage);

  const form = useRef();

  //const loadingShow = useSelector((state) => state.authData.loading);

  const options = [
    { value: "dev", label: "Developer" },
    { value: "manager", label: "Manager" },
  ];

  useEffect(() => {
    if (getOtp?.success === false) {
      toast.info(getOtp?.message);
    }
    if (getOtp?.success === true) {
      navigate("/otpverify/" + getOtp?.id);
    }
  }, [getOtp, navigate]);

  const onSubmit = (values) => {
    // navigate("/login");
    // if (getOtp.success === true) {

    // }
    const arr = getData?.find((elem) => values.manager.value === elem._id);
    dispatch(
      userRegister({
        ...values,
        role: values.role.value,
        manager: arr,
      })
    );
    // .then((e) => {
    //   if (e.payload.data.success === false) {
    //     toast.error(e?.payload?.data?.message);
    //   } else {
    //     toast.success(e?.payload?.data?.message);
    //     setShow(!show);
    //   }
    // });
  };

  const registeredName = () => {
    if (getData && getData.length > 0) {
      const options = getData?.map(({ _id, name }) => {
        return { label: name, value: _id };
      });
      return options;
    }
  };

  return (
    <>
      <div>
        <h2 className="d-flex justify-content-center">Register</h2>

        <div className="mx-auto">
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
              //    error["password"] =
              //  "password should have small char, Capital char, @ , number";
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
              <Container>
                <form onSubmit={handleSubmit} ref={form}>
                  <Row className="">
                    <Col md={3} className="mx-auto">
                      <Field name="name">
                        {({ input, meta }) => (
                          <div className="mb-3">
                            <label>Name: </label>
                            <input {...input} type="text" placeholder="name" />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                  <div>
                    <Row>
                      <Col md={3} className="mx-auto">
                        <Field name="email">
                          {({ input, meta }) => (
                            <div className="mb-3">
                              <label>Email: </label>
                              <input
                                {...input}
                                type="text"
                                placeholder="email"
                              />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md={3} className="mx-auto">
                        <Field name="password">
                          {({ input, meta }) => (
                            <div className="mb-3">
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
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md={3} className="mx-auto">
                        <Field name="role">
                          {({ input, meta }) => (
                            <div className="mb-3">
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
                      </Col>
                    </Row>
                  </div>

                  {values.role && values.role.value === "manager" && (
                    <Row>
                      <Col md={3} className="mx-auto">
                        <Field name="manager">
                          {({ input, meta }) => (
                            <div className="mb-3">
                              <Select
                                {...input}
                                className="select"
                                placeholder="select your name"
                                options={registeredName()}
                              />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </div>
                          )}
                        </Field>
                      </Col>
                    </Row>
                  )}

                  <div className=" w-100">
                    <Button className="m-auto d-flex" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Container>
            )}
          />
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
