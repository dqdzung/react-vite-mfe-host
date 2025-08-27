import type { StateCreator } from "zustand";

export interface UserSlice {
	user: { name: string } | null;
	setUser: (user: { name: string } | null) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
	set
) => ({
	user: null,
	setUser: (user) => set({ user }),
});

