import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    email: string
    expiresAt: string
    id: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        expiresAt: '',
        id: '',
    } as UserState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.email = action.payload.email
            state.expiresAt = action.payload.expiresAt
            state.id = action.payload.id
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
