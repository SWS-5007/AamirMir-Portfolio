import axios from 'axios'
axios.defaults.withCredentials = true;

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" })
        const { data } = await axios.get("/me")
        dispatch({ type: "loadUserSuccess", payload: data.user })
    } catch (error) {
        dispatch({ type: "loadUserFailure", payload: error.response.data.message })
    }
}
export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        const userData = {
            email,
            password
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: "loginUserRequest" })
        const { data } = await axios.post("/login", userData, config)
        dispatch({ type: "loginUserSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "loginUserFailure", payload: error.response.data.message })
    }
}
export const forgetPassword = ({ forgetEmail }) => async (dispatch) => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: "forgetPasswordRequest" })
        const { data } = await axios.post("/forget", { email: forgetEmail }, config)
        dispatch({ type: "forgetPasswordSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "forgetPasswordFailure", payload: error.response.data.message })
    }
}
export const resetPassword = ({ newPassword, confirmPassword, token }) => async (dispatch) => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const userData = {
            newPassword,
            confirmPassword
        }
        dispatch({ type: "resetPasswordRequest" })
        const { data } = await axios.put(`/reset/${token}`, userData, config)
        dispatch({ type: "resetPasswordSuccess", payload: data.message })
    } catch (error) {
        dispatch({ type: "resetPasswordFailure", payload: error.response.data.message })
    }
}
export const sendContact = ({ userName, userEmail, userMessage }) => async (dispatch) => {
    try {
        dispatch({ type: "sendContactRequest" })
        const config = {
            headers: {
                "Contact-Type": "application/json"
            }
        }
        const userData = {
            name: userName,
            email: userEmail,
            msg: userMessage
        }
        await axios.post("/contact", userData, config)
        dispatch({ type: "sendContactSuccess", payload: "Contact Sent" })
    } catch (err) {
        dispatch({ type: "sendContactFailure", payload: err.response.data.message })
    }
}
export const getUserDetails = () => async (dispatch) => {
    try {
        dispatch({ type: "getUserDataRequest" })
        const { data } = await axios.get("/data")
        dispatch({ type: "getUserDataSuccess", payload: data.data })

    } catch (error) {
        dispatch({ type: "getUserDataFailure", payload: error.response.data.message })
    }
}
export const deleteSkill = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteSkillRequest" })
        const { data } = await axios.put(`/skill/delete/${id}`)
        dispatch({ type: "deleteSkillSuccess", payload: data.message })

    } catch (error) {
        dispatch({ type: "deleteSkillFailure", payload: error.response.data.message })
    }
}
export const deleteProject = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteProjectRequest" })
        const { data } = await axios.put(`/project/delete/${id}`)
        dispatch({ type: "deleteProjectSuccess", payload: data.message })

    } catch (error) {
        dispatch({ type: "deleteProjectFailure", payload: error.response.data.message })
    }
}