import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../../Redux/auth/authSlice";
import { setUser } from "../../Redux/user/userSlice";
import "../Login/login.styles.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
      dispatch(reset());
    }
  }, [isSuccess, reset, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      password,
    };

    const res = dispatch(loginUser(dataToSubmit));
    dispatch(setUser(res));
  };

  return (
    <div className="container">
      <h1 className="heading center"></h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="register">
        <button
          className="register_button"
          onClick={() => navigate("/register")}
        >
          Dont have an account ? Register
        </button>
      </div>
    </div>
  );
}

export default Login;
