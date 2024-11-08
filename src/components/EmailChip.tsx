import { forwardRef } from "react";

interface EmailChipProps {
	email: string;
	onDelete: () => void;
	onClick?: () => void;
}

const EmailChip = forwardRef<HTMLDivElement, EmailChipProps>(
	({ email, onDelete, onClick }, ref) => {
		return (
			<div className="email-chip cursor-default" ref={ref} onClick={onClick}>
				{email}
				<button
					type="button"
					className="hover:opacity-70 flex items-center"
					onClick={(e) => {
						e.stopPropagation(); // Prevent triggering onClick when deleting
						onDelete();
					}}
				>
					<span className="material-symbols-outlined">close</span>
				</button>
			</div>
		);
	}
);

export default EmailChip;
