import { userService, type UserCreateDTO } from "../components/services/userService";
import type { AppDispatch, RootState } from "../store/store"
import { useDispatch, useSelector } from "react-redux"
import { addUser, loadingUsers, updateUser, removeUser } from "../store/slices/users/userSlice"

export const useUser = () => {
    const { users } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    const getUsers = async() =>{
        const response = await userService.findAll();
        dispatch(loadingUsers(response))
    }

    const createUser = async(user:UserCreateDTO) => {
        const response = await userService.save(user);
        //dispatch(addUser({id: response.data.id, fullName: `${user.lastname} ${user.lastname}`, ...user}))
        return response;
    }

    const deleteUser = async(id:string) => {
        const response = await userService.delete(id);
        if(response.status === 204){
            dispatch(removeUser(id));
        }
        return response;
    }

    const updateUserThunk = async (id: string, user: any) => {
        const response = await userService.update(id, user);
        console.log(response);
        if (response.status === 204) {
            dispatch(updateUser({id: id, ...user}));            
        }
        return response;
    }

    return { users, getUsers, createUser, updateUserThunk, deleteUser };
}