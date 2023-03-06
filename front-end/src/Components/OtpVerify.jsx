import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";

const OtpVerify = (props) => {
  const [otpVal, setOtpVal] = useState("");

  const { show } = props;
  const form = useRef();

  function onSubmit() {}

  return (
    <div>
      <div>
        {show && (
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} ref={form}>
                <Field name="otp">
                  {({ input, meta }) => (
                    <div>
                      <label> otp verification: </label>
                      <input {...input} type="number" placeholder="otp" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <button type="submit"> send</button>
              </form>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default OtpVerify;
