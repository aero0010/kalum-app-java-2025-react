import kalumManagementApi from "./kalumManagenetApi";

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        expiration: string;
    };
    error: string[];
}

export const authService = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const response = await kalumManagementApi.post<LoginResponse>('/account/login', {username, password});
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};