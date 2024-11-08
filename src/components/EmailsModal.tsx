import { EmailObject } from "../App";

interface EmailsModalProps {
	currentEmails: EmailObject[];
	handleDeleteEmail: (id: number) => void;
}

export const EmailsModal = ({
	currentEmails,
	handleDeleteEmail,
}: EmailsModalProps) => {
	// () => or just handleDeleteEmail?
	return (
		<div className="flex flex-wrap gap-2 absolute top-full card mt-2 w-3/5 min-w-40 left-4">
			{currentEmails.map((obj) => (
				<div key={obj.id} className="email-chip cursor-default">
					{obj.email}
					<button
						type="button"
						className="hover:text-gray-800"
						onClick={() => handleDeleteEmail(obj.id)}
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>
			))}
		</div>
	);
};
