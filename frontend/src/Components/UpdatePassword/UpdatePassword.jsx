import React, { useEffect, useState } from 'react'
import "./../Dashboard/Dashboard.css"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import RightContent from '../RightContent/RightContent'
import { updatePassword } from '../../Actions/dashboardActions'
const UpdatePassword = () => {
    const { loading, error, message } = useSelector((state) => state.updatePassword)
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessages" })
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }, [alert, error, message, dispatch])
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submitPassword = (e) => {
        e.preventDefault()
        dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }))
    }
    return <div className="Dashboard">
        <div className="dashboard-content add-projects">
            <h1>Update Password</h1>
            <form action="" onSubmit={submitPassword}>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Old Password' name="" required id="" />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' name="" required id="" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' name="" id="" />

                <input disabled={loading ? true : false} style={{ backgroundColor: loading && "gray" }} type="submit" value="Update Password" />
            </form>
        </div>

        <RightContent />
    </div>
}

export default UpdatePassword;