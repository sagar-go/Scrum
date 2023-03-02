import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();

  //  const userLogin = useSelector((state) => state?.authData?.)

  const onSubmit = (values) => {
    console.log(values, "fffffff");

    dispatch(
      userLogin({
        email: "mitesh2@gmail.com",
        password: "1",
      })
    );
  };

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
    </div>
  );
};
export default Login;
