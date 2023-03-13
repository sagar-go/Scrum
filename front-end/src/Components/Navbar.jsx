import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="box">
      <div className="navbar">
        <div>
          <Link to="/" style={{ "text-decoration": "none" }}>
            Register
          </Link>
        </div>
        <div>
          <Link to="/otpverify/:id" style={{ "text-decoration": "none" }}>
            Otpverify
          </Link>
        </div>
        <div>
          <Link to="/login" style={{ "text-decoration": "none" }}>
            Login
          </Link>
        </div>
        <div>
          <Link to="/home" style={{ "text-decoration": "none" }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
