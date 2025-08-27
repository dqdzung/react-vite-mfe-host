import type { StateCreator } from "zustand";

export interface CounterSlice {
	count: number;
	increment: () => void;
	decrement: () => void;
	clear: () => void;
}

export const createCounterSlice: StateCreator<
	CounterSlice,
	[],
	[],
	CounterSlice
> = (set) => ({
	count: 0,
	increment: () => set((state) => ({ count: state.count + 1 })),
	decrement: () => set((state) => ({ count: state.count - 1 })),
	clear: () => set({ count: 0 }),
});

