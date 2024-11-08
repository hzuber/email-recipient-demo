interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
	<p className="mt-6 text-red-600">{message}</p>
);

export default ErrorMessage;
