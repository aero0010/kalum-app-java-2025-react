import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux"
import {userService} from '../services/userService';
import { loadingUsers, addUser, removeUser, updateUser } from '../store/slices/users/userSlice';


export const useUser = () => {
    const {users} = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    const getUsersThunk = async () => {
        const response = await userService.findAll();  
        dispatch(loadingUsers(response.data))
    }

    const createUserThunk = async (user: any) => {
        const response = await userService.save(user);
        dispatch(addUser({id: response.data.id, fullName: `${user.lastname} ${user.firstname}`,identityUser: 0, ...user}));
        return response;
    }

    const deleteUserThunk = async (id: string) => {
        const response = await userService.delete(id);
        if(response.status == 204) {
            dispatch(removeUser(id))
        }
        return response;
    }

    const updateUserThunk = async (id: string, user: any) => {
        const response = await userService.update(id, user);
        if(response.status == 204) {
            dispatch(updateUser({id, ...user}));
        }
        return response;
    }
    
    return {
        users,
        getUsersThunk,
        createUserThunk,
        deleteUserThunk,
        updateUserThunk
    }
}   