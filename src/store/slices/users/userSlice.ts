import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserListResponse } from "../../../components/services/userService";

export const usersSlice = createSlice({
    name: 'users',
    initialState:{
        users: []
    },
    reducers:{
        loadingUsers: (state, {payload}) =>{
            state.users = payload;
        },
        addUser: (state, action: PayloadAction<UserListResponse>) => {
            const data:any = action.payload.data;
            const id = data.id;
            console.log(id);
            state.users = [...state.users]
        }
    }
});


export const { loadingUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;