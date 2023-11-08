import React, { useState } from 'react'
import "./Header.css"
import { Avatar, IconButton } from "@mui/material"
import { NavLink, useNavigate } from 'react-router-dom'
import { Facebook, Instagram, GitHub } from '@mui/icons-material'
import { useSelector } from 'react-redux'
const Header = () => {
    const [toggleShow, setToggleShow] = useState(true)
    const { user, isAuthenticated } = useSelector((state) => state.loadUser)
    const navigate = useNavigate()
    const handleProfile = () => {
        if (isAuthenticated) {
            navigate("/dashboard")
        } else {
            navigate("/login")
        }
    }

    const socialMediaHandler = (url) => {
        const anchorTag = document.createElement("a")
        anchorTag.target = "_blank"
        anchorTag.href = url

        const body = document.getElementsByTagName("body")[0]
        body.appendChild(anchorTag)
        anchorTag.click()
        body.removeChild(anchorTag)

    }

    return <> <div style={{ display: toggleShow ? "none" : "initial" }} className="Header">
        <div className="account">
            <Avatar src={user && user?.about && user.about.avatar.url ? user.about.avatar.url : ""} onClick={handleProfile} className='avatar' />
        </div>
        <nav>
            <ul>
                <NavLink to="/">Home</NavLink>
                {location.href.toString().split("/").reverse()[0] !== "login" && <a href="#skills">Skills</a>}
                {location.href.toString().split("/").reverse()[0] !== "login" && <a href="#projects">Projects</a>}
            </ul>
        </nav>

        <div className="social-media-container">
            <IconButton onClick={() => socialMediaHandler("https://www.facebook.com/profile.php?id=100077478429547")}>
                <Facebook className='social-media-links' />
            </IconButton>

            <IconButton onClick={() => socialMediaHandler("https://www.instagram.com/aamir72633/")}>
                <Instagram className='social-media-links' />
            </IconButton>

            <IconButton onClick={() => socialMediaHandler("https://github.com/AamirMir1")}>
                <GitHub className='social-media-links' />
            </IconButton>

        </div>
    </div>
        <div className="burger" onClick={() => setToggleShow(!toggleShow)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    </>
}
export default Header;