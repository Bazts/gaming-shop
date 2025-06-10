import { create } from 'zustand'

interface AuthState {
  accessToken: null | string
  setAuthToken: (token: string) => void
  clearToken: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAuthToken: (token) => set({ accessToken: token }),
  clearToken: () => set({ accessToken: null })
}))