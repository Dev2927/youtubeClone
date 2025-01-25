import { create } from "zustand";

export interface SignupBody {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  coverImage: string;
}

export const initialSignupBody: SignupBody = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  avatar: "",
  coverImage: "",
};

export interface SignupErrorBody {
  fullName: boolean;
  email: boolean;
  username: boolean;
  password: boolean;
  avatar: boolean;
  coverImage: boolean;
}

export const initialSignupErrorBody: SignupErrorBody = {
  fullName: false,
  email: false,
  username: false,
  password: false,
  avatar: false,
  coverImage: false,
};

export interface LoginBody {
  email: string;
  password: string;
}

export const initialLoginBody: LoginBody = {
  email: "",
  password: "",
};

export interface LoginErrorBody {
  email: boolean;
  password: boolean;
}

export const initialLoginErrorBody: LoginErrorBody = {
  email: false,
  password: false,
};

export interface AuthStore {
  refreshToken: string;
  accessToken: string;
  addRefreshToken: (token: string) => void;
  addAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  refreshToken: "",
  accessToken: "",
  addAccessToken: (token) => set({ accessToken: token }),
  addRefreshToken: (token) => set({ refreshToken: token }),
}));
