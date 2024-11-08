import { forwardRef } from "react";

interface EmailChipProps {
	email: string;
	onDelete: () => void;
}

const EmailChip = forwardRef<HTMLDivElement, EmailChipProps>(
	({ email, onDelete }, ref) => {
		return (
			<div className="email-chip cursor-default" ref={ref}>
				{email}
				<button
					type="button"
					className="hover:opacity-70 flex items-center"
					onClick={onDelete}
				>
					<span className="material-symbols-outlined">close</span>
				</button>
			</div>
		);
	}
);

export default EmailChip;
