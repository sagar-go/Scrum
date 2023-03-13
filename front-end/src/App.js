import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import OtpVerify from "./Components/OtpVerify";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Protected from "./Components/Protected";

function App() {
  // const [isLoggedIn, setisLoggedIn] = useState(null);
  // const logIn = () => {
  //   setisLoggedIn(true);
  // };
  // const logOut = () => {
  //   setisLoggedIn(false);
  // };
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        {/* {isLoggedIn ? (
          <button onClick={logOut}>Logout</button>
        ) : (
          <button onClick={logIn}>Login</button>
        )} */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/otpverify/:id" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route
            path="/home"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Home />
              </Protected>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
