import { create } from "zustand";
import { createCounterSlice, type CounterSlice } from "./slices/counterSlice";
import { createUserSlice, type UserSlice } from "./slices/userSlice";
import { persist } from "zustand/middleware";

type BoundStore = CounterSlice & UserSlice;

const useStore = create<BoundStore>()(
	persist(
		(...arg) => ({
			...createCounterSlice(...arg),
			...createUserSlice(...arg),
		}),
		{
			name: "app-persist",
			partialize: (state) => ({
				user: state.user,
				count: state.count,
			}),
		}
	)
);

export default useStore;

