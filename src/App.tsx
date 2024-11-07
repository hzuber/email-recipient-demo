import { useState } from "react";
import EmailInput from "./components/EmailInput";
import { Button } from "./components/Button";

import "./styles/App.scss";
import { EmailsModal } from "./components/EmailsModal";

export type EmailObject = {
	id: number;
	email: string;
};

export default function Index() {
	const [emails, setEmails] = useState<EmailObject[]>([]);
	const [error, setError] = useState<string | null>();
	const [showModal, setShowModal] = useState(false);
	const createId = () => {
		var min = 10000;
		var max = 99999;
		var num = Math.floor(Math.random() * (max - min + 1)) + min;
		return num;
	};

	const handleAddEmail = (email: string) => {
		const id = createId();
		if (!validateEmail(email) || !email) {
			setError("Please enter a valid email address");
			return false;
		}
		const existingEmail = emails.find((obj) => obj.email === email);
		if (existingEmail) {
			setError("You have already added this recipient");
			return false;
		}
		setError(null);
		const emailObj: EmailObject = { id, email };
		setEmails((prevState) => [...prevState, emailObj]);
		return true;
	};

	const onButtonClick = () => {
		console.log("Here are the emails you've added:", ...emails);
	};

	const handleDeleteEmail = (id: number) => {
		const updatedEmails = emails.filter((obj) => obj.id !== id);
		setEmails(updatedEmails);
	};

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const removeError = () => {
		setError(null);
	};

	return (
		<div className="flex h-screen w-full px-4 py-6 justify-center">
			<div className="flex flex-col items-center w-full">
				<header className="flex flex-col items-center gap-9">
					<h1 className="leading text-2xl font-bold ">Email Input Example</h1>
				</header>
				<div className="flex w-full gap-4 items-center relative mt-8">
					{showModal && (
						<div
							className="full-overlay"
							onClick={() => {
								showModal && setShowModal(false);
							}}
						/>
					)}
					<EmailInput
						currentEmails={emails}
						handleAddEmail={handleAddEmail}
						handleDeleteEmail={handleDeleteEmail}
						removeErrors={removeError}
						setEmails={setEmails}
						setShowModal={setShowModal}
						showModal={showModal}
					/>
					<Button
						text={`Add Users (${emails.length})`}
						onClick={onButtonClick}
					/>
					{showModal && (
						<EmailsModal
							currentEmails={emails}
							handleDeleteEmail={handleDeleteEmail}
						/>
					)}
				</div>
				<p className="mt-6 text-red-600">{error && error}</p>
			</div>
		</div>
	);
}
