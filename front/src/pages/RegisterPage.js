import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"
import apiClient from "../api/apiClient";
export const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/register", {
                username,
                password
            })
            setError("")
            alert("ユーザー登録が完了しました")
            navigate("/home");
        } catch (error) {
            setError("既にそのユーザー名は使用されています。")
        }
    };

    return (
        <div>
            <Navbar menu1="Login" menu2="Sign in" link1="/" link2="/register" />
            <div className="register-container">
                <div className="container" >
                    <h2>新規登録</h2>
                    <form onSubmit={handleSubmit} className="register-form">
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
                        <button type="submit" className="register-button">上記の内容で登録</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
