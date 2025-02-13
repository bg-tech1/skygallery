import { useState } from "react"
import "./UserInfo.css"
export const UserInfo = ({ username }) => {
    const [userIcon, setUserIcon] = useState(
        "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
    );
    return (
        <div className="userInfo">
            <div className="icon">
                <img src={userIcon} alt="User Icon" />
            </div>
            <div className="userName">
                <p>{username}</p>
            </div>
            <div className="profile"></div>
        </div>
    )
}