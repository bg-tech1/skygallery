import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Navbar from "../components/Navbar";
import apiClient from "../api/apiClient";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let responce = await apiClient.post("/login", {
        username,
        password
      })
      setError("")
      navigate("/mypage", { state: { username: username } });
    } catch (error) {
      console.log(error)
      setError("Login failed")
    }
  };

  return (
    <div className="LoginFormContaier">
      <Navbar menu1="Login" menu2="Sign in" link1="/" link2="/register" />
      <div className="login-container">
        <div className="container" >
          <h2>ログイン</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">ユーザー名</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名を入力してください"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力してください"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="registerLink">
            <Link to="/register" className="link"> 新規登録はこちらから</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
