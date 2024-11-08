import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import validateEmail from "../utils/validateEmail";

export type EmailObject = {
	id: string;
	email: string;
};

export function useEmails() {
	const [emails, setEmails] = useState<EmailObject[]>([]);
	const [error, setError] = useState<string | null>(null);

	const addEmail = (email: string) => {
		if (!validateEmail(email) || !email) {
			setError("Please enter a valid email address");
			return false;
		}
		const existingEmail = emails.find((obj) => obj.email === email);
		if (existingEmail) {
			setError("You have already added this recipient");
			return false;
		}
		const id = uuidv4();
		setError(null);
		const emailObj: EmailObject = { id, email };
		setEmails((prevState) => [...prevState, emailObj]);
		return true;
	};

	const deleteEmail = (id: string) => {
		const updatedEmails = emails.filter((obj) => obj.id !== id);
		setEmails(updatedEmails);
	};

	const clearError = () => setError(null);

	return {
		emails,
		error,
		setEmails,
		addEmail,
		deleteEmail,
		clearError,
	};
}
