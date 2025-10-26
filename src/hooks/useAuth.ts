import { useDispatch, useSelector } from 'react-redux';
import type{ AppDispatch, RootState } from '../store/store';
import { loginStart, logout } from '../store/slices/auth/authSlice';
import { authService } from '../components/services/authService';
import { loginSuccess, loginFailure } from '../store/slices/auth/authSlice';

export const useAuth = () => {
    const {user, token, loading, error} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    
    const handerLogin = async (username: string, password: string) => {
        dispatch(loginStart());
        try {
            const data = await authService.login(username, password);
            dispatch(loginSuccess(data));
            return data;
        } catch (err: any) {
            dispatch(loginFailure(err.response?.data?.message ?? 'Login failed'));
        }
    };

    const handleLogout = () => {
        // Implement logout logic here, possibly dispatching actions to the auth slice
        dispatch(logout());
    };
    return { 
        user, 
        token, 
        loading, 
        error, 
        isAuthenticated: Boolean(token), 
        login: handerLogin, 
        logout: handleLogout 
    };
}