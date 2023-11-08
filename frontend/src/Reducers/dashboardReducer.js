import { createReducer } from '@reduxjs/toolkit'
const initialState = {

}
export const addProjectsReducer = createReducer(initialState, {
    addProjectRequest: (state) => {
        state.loading = true
    },
    addProjectSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    addProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessages: (state) => {
        state.message = null;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})
export const addSkillsReducer = createReducer(initialState, {
    addSkillsRequest: (state) => {
        state.loading = true
    },
    addSkillsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    addSkillsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessages: (state) => {
        state.message = null;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})
export const updateProfileReducer = createReducer(initialState, {
    updateProfileRequest: (state) => {
        state.loading = true
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessages: (state) => {
        state.message = null;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})
export const updatePasswordReducer = createReducer(initialState, {
    updatePasswordRequest: (state) => {
        state.loading = true
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    updatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessages: (state) => {
        state.message = null;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})
export const logoutReducer = createReducer(initialState, {
    logoutRequest: (state) => {
        state.loading = true
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearMessages: (state) => {
        state.message = null;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})