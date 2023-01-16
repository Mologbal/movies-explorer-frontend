import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isUserLogged: false,
        deviceType: 'desktop'
    },
    reducers: {
        switchLogin(state) {
            state.isUserLogged = !state.isUserLogged;
        },
        setDevice(state, action) {
            state.deviceType = action.payload.currentDevice;
            console.log(state.deviceType)
        }
    }
});

export const {switchLogin, setDevice} = userSlice.actions;

export default userSlice.reducer;
