interface ButtonProps {
	text: string;
	onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
	return (
		<button className="btn-primary" type="submit" onClick={() => onClick()}>
			{text}
		</button>
	);
};
