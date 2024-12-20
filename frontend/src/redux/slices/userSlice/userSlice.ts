import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
    currentUser: currentUser
}

export type currentUser = {
    email: string,
    userId: number | null,
    username: string,
    profileImage: string | null
}

const initialState: userState = {
    currentUser: {
        email: '',
        userId: null,
        username: '',
        profileImage: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<currentUser>) => {
            state.currentUser = action.payload
        }
    },
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer