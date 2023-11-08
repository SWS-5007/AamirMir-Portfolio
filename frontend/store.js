import { configureStore } from "@reduxjs/toolkit"
import { deleteProjectReducer, deleteSkillReducer, forgetPasswordReducer, getUserDataReducer, loadUserReducer, loginUserReducer, resetPasswordReducer, sendContactReducer } from "./src/Reducers/userReducer";
import { addProjectsReducer, addSkillsReducer, logoutReducer, updatePasswordReducer, updateProfileReducer } from "./src/Reducers/dashboardReducer";

const store = configureStore({
    reducer: {
        loadUser: loadUserReducer,
        loginUser: loginUserReducer,
        createProject: addProjectsReducer,
        addSkills: addSkillsReducer,
        updateProfile: updateProfileReducer,
        updatePassword: updatePasswordReducer,
        logout: logoutReducer,
        forgetPassword: forgetPasswordReducer,
        resetPassword: resetPasswordReducer,
        sendContact: sendContactReducer,
        getUserData: getUserDataReducer,
        deleteSkill: deleteSkillReducer,
        deleteProject: deleteProjectReducer
    }
})

export default store;