import React, { useEffect } from 'react'
import "./RightContent.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Actions/dashboardActions'
import { useAlert } from 'react-alert'

const RightContent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, message } = useSelector((state) => state.logout)
    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessages" })
            navigate("/")
            location.reload()
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
    }, [message, error, dispatch, alert])
    const handleLogout = async () => {
        await dispatch(logout())
    }
    return <div className="RightContent">
        <button onClick={() => navigate("/dashboard")}>
            Add Projects
        </button>
        <button onClick={() => navigate("/skills/add")}>
            Add Skills
        </button>
        <button onClick={() => navigate("/profile/update")}>
            Update Profile
        </button>
        <button onClick={() => navigate("/password/update")}>
            Update Password
        </button>
        <button disabled={loading ? true : false} style={{ backgroundColor: loading && "gray" }} onDoubleClick={handleLogout}>
            Logout
        </button>

    </div>
}

export default RightContent;