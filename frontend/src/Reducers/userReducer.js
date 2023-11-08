import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false
}


export const loadUserReducer = createReducer(initialState, {
    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})
export const loginUserReducer = createReducer(initialState, {
    loginUserRequest: (state) => {
        state.loading = true;
    },
    loginUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    loginUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.messages = null
    }
})
export const forgetPasswordReducer = createReducer(initialState, {
    forgetPasswordRequest: (state) => {
        state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    forgetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.messages = null
    }
})
export const resetPasswordReducer = createReducer(initialState, {
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.messages = null
    }
})

export const sendContactReducer = createReducer(initialState, {
    sendContactRequest: (state) => {
        state.loading = true
    },
    sendContactSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    sendContactFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.message = null;
    }
})
export const getUserDataReducer = createReducer(initialState, {
    getUserDataRequest: (state) => {
        state.loading = true;
    },
    getUserDataSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload
    },
    getUserDataFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})
export const deleteSkillReducer = createReducer(initialState, {
    deleteSkillRequest: (state) => {
        state.loading = true;
    },
    deleteSkillSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    deleteSkillFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state, action) => {
        state.message = null;
    }
})
export const deleteProjectReducer = createReducer(initialState, {
    deleteProjectRequest: (state) => {
        state.loading = true;
    },
    deleteProjectSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    deleteProjectFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state, action) => {
        state.message = null;
    }
})
