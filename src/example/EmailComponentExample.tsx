import { useState } from "react";
import { useEmails } from "../hooks/useEmails";
import EmailInput from "../components/EmailInput";
import { Button } from "../components/Button";
import { EmailsModal } from "../components/EmailsModal";
import ErrorMessage from "../components/ErrorMessage";

export type EmailObject = {
	id: string;
	email: string;
};

export default function EmailComponentExample() {
	const { emails, error, setEmails, addEmail, deleteEmail, clearError } =
		useEmails();
	const [showModal, setShowModal] = useState(false);
	const onSubmitButtonClick = () => {
		console.log("Here are the emails you've added:", ...emails);
	};

	return (
		<>
			<div className="flex w-full gap-4 items-center relative mt-8 flex-wrap justify-center">
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
					handleAddEmail={addEmail}
					handleDeleteEmail={deleteEmail}
					removeErrors={clearError}
					setEmails={setEmails}
					setShowModal={setShowModal}
					showModal={showModal}
				/>
				<Button
					text={`Add Users (${emails.length})`}
					onClick={onSubmitButtonClick}
					disabled={emails.length < 1}
				/>
				{showModal && (
					<EmailsModal currentEmails={emails} handleDeleteEmail={deleteEmail} />
				)}
			</div>
			{error && <ErrorMessage message={error} />}
		</>
	);
}
