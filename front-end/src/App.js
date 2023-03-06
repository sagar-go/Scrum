import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import User from "./Components/User";
import Register from "./Components/Register";
import OtpVerify from "./Components/OtpVerify";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Signup />} /> */}
          <Route path="/" element={<Register />} />
          <Route path="/otpverify" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
