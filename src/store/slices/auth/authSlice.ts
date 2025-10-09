import { createSlice }  from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loading: boolean;
  error: string | null;
  user: {
    username: string;
    email: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ 
        success: boolean, 
        message: string, 
        data: {
            token: string, 
            expiration: string
        }, 
        error: string[] 
    }>) {
        state.loading = false;
        state.user = decodeJWT(action.payload.data.token);
        state.token = action.payload.data.token;
        localStorage.setItem('token', action.payload.data.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token'); 
    }
  }
});

const decodeJWT = (token: string) => {
    try {
        const payloadBase64 = token.split('.')[1];
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/'); 
        const json = decodeURIComponent(
            atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(json);
    }catch(error: any) {
        console.error("Error al decodificar el JWT", error.message);
        return null;
    }
}

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;