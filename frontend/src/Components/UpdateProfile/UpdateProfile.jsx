import React, { useEffect, useState } from 'react'
import "./../Dashboard/Dashboard.css"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import RightContent from '../RightContent/RightContent'
import { updateProfile } from '../../Actions/dashboardActions'
import { loadUser } from '../../Actions/userActions'
const UpdateProfile = () => {
    const { loading, error, message } = useSelector((state) => state.updateProfile)
    const { user } = useSelector((state) => state.loadUser)
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
            dispatch(loadUser())
        }
    }, [alert, error, message, dispatch])
    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [avatar, setAvatar] = useState(user && user?.about ? user.about.avatar.url : "")
    const [title, setTitle] = useState(user && user?.about ? user.about.title : "")
    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const submitProfile = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ name, email, avatar, title }))
    }
    return <div className="Dashboard">
        <div className="dashboard-content add-projects">
            <h1>Update Profile</h1>
            <form action="" onSubmit={submitProfile}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' name="" required id="" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' name="" required id="" />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' name="" id="" />


                <label id='thumb' htmlFor="thumbnail">Choose Avatar</label>
                {avatar && <img src={avatar} alt="" />}
                <input type="file" accept='image/*' onChange={handleThumbnail} name="" id="thumbnail" />
                <input disabled={loading ? true : false} style={{ backgroundColor: loading && "gray" }} type="submit" value="Update Profile" />
            </form>
        </div>

        <RightContent />
    </div>
}

export default UpdateProfile;