import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSvc from "../pages/auth/auth.service";

export const getLoggedInUserFromReducer: any = createAsyncThunk(
    "User/getLoggedInUserFromReducer",
    async() => {
        try{
            const response: any = await authSvc.getRequest('/auth/me', {auth: true});
            return response.result;

        } catch(exception) {
            throw exception;
        }
    }
)


const UserSlicer = createSlice({
    name: "User",
    initialState: {
        loggedInUser: null
    },
    reducers: {
        setLoggedInUser: (state, action) => {
            // name/reducername 
            // for eg. User/setLoggedInUser
            state.loggedInUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLoggedInUserFromReducer.fulfilled, (state, action) => {
            state.loggedInUser = action.payload
        })
        builder.addCase(getLoggedInUserFromReducer.rejected, (state) => {
            state.loggedInUser =  null
        })
    }
})

export const {setLoggedInUser} = UserSlicer.actions

export default UserSlicer.reducer;