import React from "react";
import { Field, Form } from "react-final-form";
import Select from "react-select";

const Login = () => {
  const options = [
    { value: "Developer", label: "Developer" },
    { value: "Team lead", label: "Team lead" },
  ];

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h2>Sign up</h2>
      <div>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const error = {};
            if (!values.username) {
              error["username"] = "username required!";
            }
            if (!values.email) {
              error["email"] = "email required!";
            }
            if (!values.password) {
              error["password"] = "password required!";
            }
            if (!values.role) {
              error.role = "select your role";
            }
            return error;
          }}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username">
                {({ input, meta }) => (
                  <div>
                    <label>Name: </label>
                    <input {...input} type="text" placeholder="username" />
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
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label>Password: </label>
                      <input {...input} type="number" placeholder="password" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
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
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
