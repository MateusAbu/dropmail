import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SessionState {
    mails: Mail[]
}

interface Mail {
    toAddr: string
    text: string
    rawSize: number
    headerSubject: string
    fromAddr: string
    downloadUrl: string
}

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        mails: [],
    } as SessionState,
    reducers: {
        setSessionData: (state, action: PayloadAction<SessionState>) => {
            return action.payload
        },
    },
})

export const { setSessionData } = sessionSlice.actions

export default sessionSlice.reducer
