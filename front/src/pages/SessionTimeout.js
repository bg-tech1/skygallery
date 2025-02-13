import { useNavigate } from "react-router-dom";
import "./SessionTimeout.css";
import { FaExclamationTriangle } from "react-icons/fa"; // ⚠️ アイコン追加

const SessionTimeout = () => {
    const navigate = useNavigate();

    return (
        <div className="timeout-page">
            <div className="timeout-message">
                <FaExclamationTriangle className="timeout-icon" />
                <h2>セッションが切れました</h2>
                <p>一定時間操作がなかったため、自動的にログアウトされました。</p>
                <button className="login-button" onClick={() => navigate("/")}>
                    再ログインはこちら
                </button>
            </div>
        </div>
    );
};

export default SessionTimeout