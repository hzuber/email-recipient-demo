import { EmailObject } from "../example/EmailComponentExample";
import EmailChip from "./EmailChip";

interface EmailsModalProps {
	currentEmails: EmailObject[];
	handleDeleteEmail: (id: string) => void;
}

export const EmailsModal = ({
	currentEmails,
	handleDeleteEmail,
}: EmailsModalProps) => {
	// () => or just handleDeleteEmail?
	return (
		<div className="flex flex-wrap gap-2 absolute top-full card mt-2 w-3/5 min-w-40 left-4">
			{currentEmails.map((emailObj) => (
				<EmailChip
					key={emailObj.id}
					email={emailObj.email}
					onDelete={() => handleDeleteEmail(emailObj.id)}
				/>
			))}
		</div>
	);
};
