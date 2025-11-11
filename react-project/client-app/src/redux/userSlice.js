import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"role",
    initialState:{
        role:{}
    },
    reducers:{
        setRole: (state, action) => {
            state.role = action.payload
        },
          clearRole: (state) => {
            state.role = {};
        }
    }
})
export const { setRole, clearRole } = userSlice.actions;
export default userSlice.reducer;