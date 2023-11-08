import React, { useEffect, useState } from 'react'
import "./ResetPassword.css"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, resetPassword } from '../../Actions/userActions'
import { useAlert } from 'react-alert'

const ResetPassword = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector((state) => state.resetPassword)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const token = params.token
    const alert = useAlert()
    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessages" })
            dispatch(loadUser())
            navigate("/")
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
    }, [dispatch, alert, error, message])
    const handleResetPassword = (e) => {
        e.preventDefault()
        dispatch(resetPassword({ newPassword, confirmPassword, token }))

    }
    return <div className="ResetPassword">
        <div className="reset-content">
            <h1>Reset Password</h1>
            <form action="" onSubmit={handleResetPassword}>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="" required placeholder='New Password' id="" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required name="" placeholder='Confirm Password' id="" />
                <input disabled={loading ? true : false} style={{ backgroundColor: loading && "gray" }} type="submit" value="Reset" />
            </form>
        </div>
    </div>
}

export default ResetPassword