import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { logOut } from "../utils/util";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("success");
  }, []);

  const handleLogout = () => {
    navigate("/login");
    logOut();
  };

  return (
    <div>
      <h2>welcome user</h2>
      <div>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      <div>
        {" "}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
