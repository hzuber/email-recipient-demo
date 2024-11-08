import EmailComponentExample from "./example/EmailComponentExample";
import "./styles/App.scss";

export default function App() {
	return (
		<div className="flex h-screen w-full justify-between relative flex-col">
			<div className="flex flex-col px-4 py-6 items-center w-full">
				<header className="flex flex-col items-center gap-9">
					<h1 className="leading text-2xl font-bold text-blue-800">
						Email Input Example
					</h1>
				</header>
				<EmailComponentExample />
			</div>
			<footer className="px-4 py-2 w-full bg-white text-blue-900">
				@Hannah Zuber 2024
			</footer>
		</div>
	);
}
