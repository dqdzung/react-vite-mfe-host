import React, { lazy, Suspense, useRef } from "react";
import useBoundStore from "./store";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Spinner } from "./components/ui/spinner";

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
		<div className="border-2 border-red-400 p-4">
			<div className="text-background">
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
			</div>

			<section className="mt-5">
				<div className="flex flex-row gap-4">
					<Input
						className="text-background"
						ref={inputRef}
						type="text"
						placeholder="User"
						value={user?.name ?? ""}
						onChange={(e) => setUser({ name: e.target.value })}
					/>
					<Button variant="destructive" onClick={() => setUser(null)}>
						Clear
					</Button>
				</div>
			</section>

			<section className="grid grid-cols-1 gap-5 mt-5">
				<h1 className="text-xl font-bold text-background">
					Host Count: {count}
				</h1>
				<div className="grid grid-cols-2 gap-4">
					<Button onClick={increment} variant={"secondary"}>
						+1
					</Button>
					<Button onClick={clear} variant={"secondary"}>
						Clear
					</Button>
				</div>
			</section>

			{/* <Suspense
				fallback={
					<div className="flex justify-center flex-1 my-10">
						<Spinner className="text-white" size={30} />
					</div>
				}
			>
				<section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
					<MicroFrontendOne />
					<MicroFrontendTwo />
				</section>
			</Suspense> */}

			<section className="flex sm:flex-row flex-col gap-5 my-10">
				<Suspense
					fallback={
						<div className="flex justify-center flex-1">
							<Spinner className="text-white" size={30} />
						</div>
					}
				>
					<MicroFrontendOne />
				</Suspense>

				<Suspense
					fallback={
						<div className="flex justify-center flex-1">
							<Spinner className="text-white" size={30} />
						</div>
					}
				>
					<MicroFrontendTwo />
				</Suspense>
			</section>

			<section className="grid grid-cols-1 gap-5 mt-5 border-2 border-dotted border-white p-3 text-background">
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

