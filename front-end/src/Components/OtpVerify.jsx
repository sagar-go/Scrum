import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resendOtp, userOtpVerify } from "../features/actions/authActions";
import OtpInput from "react18-input-otp";

const OtpVerify = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  let { id } = useParams();

  const form = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOtp = useSelector((state) => state?.authData?.otpMessage);

  const otpConfirm = useSelector((state) => state?.authData?.otpConfirmation);

  useEffect(() => {
    if (getOtp?.success === true) {
      toast.success(getOtp?.message);
    }
  }, [getOtp]);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(30);
  }, []);

  const onSubmit = (values) => {
    if (getOtp?.otp === values.otp || id === getOtp?.id) {
      dispatch(
        userOtpVerify({
          otp: values?.otp,
          id: id,
        })
      );

      if (otpConfirm.success === true) {
        // toast.success(otpConfirm.message);
        navigate("/login");
      }

      if (otpConfirm?.success === false && values) {
        toast.error(otpConfirm?.message);
      }
    }
    if (getOtp.otp !== values.otp) {
      toast.error(otpConfirm?.message);
      console.log("otp not match");
    }
  };

  function onSubmit2() {
    setTimeLeft(30);

    dispatch(resendOtp({ id: id }));
    // .then((e) => console.log(e, "bbb"))
    // .catch((err) => console.log(err, "error"));
  }

  return (
    <div>
      <div>
        <h2>OTP Verification</h2>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form: { change } }) => (
            <form onSubmit={handleSubmit} ref={form}>
              <Field name="otp">
                {({ input, meta }) => (
                  <div>
                    <label> Check your email-id : </label>
                    {/* <input {...input} type="number" placeholder="otp" /> */}
                    <div className="input-otp">
                      <OtpInput className="otp" {...input} numInputs={4} />
                    </div>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              <button type="submit"> send</button>
            </form>
          )}
        />

        {!timeLeft && <button onClick={() => onSubmit2()}>Resend otp</button>}
        <div> {<h3>{timeLeft}</h3>}</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpVerify;
