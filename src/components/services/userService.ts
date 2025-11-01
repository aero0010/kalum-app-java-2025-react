import api from './kalumManagenetApi';

export interface UserListDTO {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data: UserListDTO[];
    error: string[]
}

export interface UserCreateDTO{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface UserCreateResponse {
    success: boolean;
    message: string;
    data: {id: string;};
    error: string[]
}



export const userService = {
    findAll: async (): Promise<UserListResponse> => {
        const response = await api.get<UserListResponse>(`/users`);
        return response.data;
    },
    save: async(user: UserCreateDTO): Promise<UserCreateResponse> => {
        const response = await api.post<UserCreateResponse>(`/users`, user)
        return response.data;
    }
}
