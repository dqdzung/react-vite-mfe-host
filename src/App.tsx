import React, { lazy, Suspense, useRef } from "react";
import useBoundStore from "./store";
import "./App.css";

// Lazy load the microfrontends
const MicroFrontendOne = lazy(() => import("mfe1/App"));
const MicroFrontendTwo = lazy(() => import("mfe2/App"));

const App: React.FC = () => {
	const { user, count, increment, clear, setUser } = useBoundStore();
	const inputRef = useRef<HTMLInputElement>(null);
	const stateFromStorage = JSON.parse(
		localStorage.getItem("app-persist") || "{}"
	)?.state;

	return (
		<div className="container border-2 border-red-400 p-4">
			<header className="main-header">
				<h1 className="text-2xl font-bold">Host Application</h1>
			</header>
			<section className="mt-5">
				<div>Welcome to our MicroFrontend Architecture</div>
				<div>
					This is the host application that loads and displays the
					microfrontends.
				</div>
			</section>

			<section className="mt-5">
				<div className="flex flex-row gap-4">
					<input
						ref={inputRef}
						type="text"
						className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
						placeholder="User"
						value={user?.name ?? ""}
						onChange={(e) => setUser({ name: e.target.value })}
					/>
					<button onClick={() => setUser(null)} className="button">
						Clear
					</button>
				</div>
			</section>

			<section className="grid grid-cols-1 gap-5 mt-5">
				<h1 className="text-xl font-bold">Host Count: {count}</h1>
				<div className="grid grid-cols-2 gap-4">
					<button onClick={increment} className="button">
						+1
					</button>
					<button onClick={clear} className="button">
						Clear
					</button>
				</div>
			</section>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
				<Suspense fallback={<div>Loading MFE1...</div>}>
					<MicroFrontendOne />
				</Suspense>

				<Suspense fallback={<div>Loading MFE2...</div>}>
					<MicroFrontendTwo />
				</Suspense>
			</div>

			<section className="grid grid-cols-1 gap-5 mt-5 border-2 border-dotted border-white p-3">
				<h1 className="text-xl font-bold">Zustand persist</h1>
				<code>
					<div>{`
              {
              user: ${stateFromStorage?.user?.name},
              hostCount: ${stateFromStorage?.count}
              }
            `}</div>
				</code>
			</section>
		</div>
	);
};

export default App;

