import React, { useEffect, useState } from 'react'
import "./Login.css"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { forgetPassword, loadUser, loginUser } from '../../Actions/userActions'
import { useNavigate } from 'react-router-dom'
import { Dialog } from '@mui/material'
const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.loadUser)
    const alert = useAlert()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { error, message, loading } = useSelector((state) => state.loginUser)
    const { error: forgetError, message: forgetMessage, loading: forgetLoading } = useSelector((state) => state.forgetPassword)
    const [open, setOpen] = useState(false)
    const [forgetEmail, setForgetEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard")
        }
    }, [isAuthenticated])
    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessages" })
        }
        if (forgetMessage) {
            alert.success(forgetMessage)
            dispatch({ type: "clearMessages" })
            setOpen(false)
        }
        if (forgetError) {
            alert.error(forgetError)
            dispatch({ type: "clearErrors" })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
    }, [dispatch, alert, forgetMessage, forgetError, error, message])
    const handleLogin = async (e) => {
        e.preventDefault()
        await dispatch(loginUser({ email, password }))
        dispatch(loadUser())
    }

    const handleForgetPassword = (e) => {
        e.preventDefault()
        dispatch(forgetPassword({ forgetEmail }))
    }
    return <div className="Login">
        <div className="login-content">
            <h1>Admin Panel</h1>
            <form action="" onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Admin Email' required name="" id="" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required name="" placeholder='Enter Admin Password' id="" />
                <span onClick={() => setOpen(true)}>Forget Password</span>
                <input disabled={loading ? true : false} style={{ backgroundColor: loading && "gray" }} type="submit" value="Login" />
            </form>
            <Dialog className='forget-dialog' onClose={() => setOpen(false)} open={open}>
                <h2>Forget Password</h2>
                <form action="" onSubmit={handleForgetPassword}>
                    <input type="email" name="" required value={forgetEmail} onChange={(e) => setForgetEmail(e.target.value)} placeholder='Enter Your Email' id="" />
                    <input disabled={forgetLoading ? true : false} style={{ backgroundColor: forgetLoading && "gray" }} type="submit" value="Send" />
                </form>
            </Dialog>
        </div>



    </div>
}
export default Login