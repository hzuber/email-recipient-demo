import { EmailObject } from "../App";

interface EmailsModalProps {
	currentEmails: EmailObject[];
	handleDeleteEmail: (id: number) => void;
}

export const EmailsModal = ({
	currentEmails,
	handleDeleteEmail,
}: EmailsModalProps) => {
	return (
		<div className="flex flex-wrap gap-2 absolute top-full card mt-2">
			{currentEmails.map((obj) => (
				<div key={obj.id} className="email-chip">
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
