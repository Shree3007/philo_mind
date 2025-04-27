// src/store/useStore.js
import { create } from 'zustand';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useStore = create((set) => ({
  backendUrl: BACKEND_URL,
}));
