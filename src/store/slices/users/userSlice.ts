import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserListDTO {
    id: string;
    username: string;
    fullName: string;
    email: string;
    identityUser: string;
    phoneNumber: string;
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data: UserListDTO[],
    error: string[]
}

export interface UsersState {
    users: UserListDTO[];
}

const initialState: UsersState = {
    users: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadingUsers: (state, {payload}) => {
            state.users = payload;
        },
        addUser: (state, action: PayloadAction<UserListDTO>) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(u => u.id !== action.payload)
        },
        updateUser: (state, action: PayloadAction<UserListDTO>) =>{
            state.users = state.users.map( user => user.id === action.payload.id ? {...user, ...action.payload} : user)
        }
    }
});

export const {loadingUsers, addUser, updateUser, removeUser} = usersSlice.actions;

export default usersSlice.reducer;