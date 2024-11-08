interface ButtonProps {
	text: string;
	onClick: () => void;
	disabled: boolean;
}

export const Button = ({ text, onClick, disabled }: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			className="btn-primary"
			type="submit"
			onClick={() => onClick()}
		>
			{text}
		</button>
	);
};
