import { userService } from "../components/services/userService";
import type { AppDispatch, RootState } from "../store/store"
import { useDispatch, useSelector } from "react-redux"

export const useUser = () => {
    const { users } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();

    const getUsers = async() =>{
        const response = await userService.findAll();
        return response;
    }

    return {getUsers};
}