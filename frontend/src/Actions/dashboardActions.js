import axios from 'axios'
axios.defaults.withCredentials = true;

export const addProject = ({ title, techStack, description, demoUrl, github, thumbnail, keyFeatures, adminEmail, adminPassword }) => async (dispatch) => {
    try {
        const userData = {
            title,
            techStack,
            description,
            demoUrl,
            github,
            thumbnail,
            keyFeatures,
            adminEmail, 
            adminPassword
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "addProjectRequest" })
        const { data } = await axios.post("/project/create", userData, config)
        dispatch({ type: "addProjectSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "addProjectFailure", payload: error.response.data.message })
    }
}
export const addSkills = ({ name, image, experience }) => async (dispatch) => {
    try {
        const userData = {
            name,
            image,
            experience
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "addSkillsRequest" })
        const { data } = await axios.post("/skill/add", userData, config)
        dispatch({ type: "addSkillsSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "addSkillsFailure", payload: error.response.data.message })
    }
}
export const updateProfile = ({ name, email, avatar, title }) => async (dispatch) => {
    try {
        const userData = {
            name,
            email,
            avatar,
            title
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "updateProfileRequest" })
        const { data } = await axios.post("/profile/update", userData, config)
        dispatch({ type: "updateProfileSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "updateProfileFailure", payload: error.response.data.message })
    }
}

export const updatePassword = ({ oldPassword, newPassword, confirmPassword }) => async (dispatch) => {
    try {
        const userData = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch({ type: "updatePasswordRequest" })
        const { data } = await axios.put("/password/update", userData, config)
        dispatch({ type: "updatePasswordSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "updatePasswordFailure", payload: error.response.data.message })
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" })
        const { data } = await axios.post("/logout")
        dispatch({ type: "logoutSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "logoutFailure", payload: error.response.data.message })
    }
}