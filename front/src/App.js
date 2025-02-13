import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import { MyPage } from "./pages/Mypage";
import { RegisterPage } from "./pages/RegisterPage";
import Logout from "./components/Logout";
import SessionTimeout from "./pages/SessionTimeout";

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/session-timeout" element={<SessionTimeout />} />
            </Routes>
        </Router>
    );
}

