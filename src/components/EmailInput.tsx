import { EmailObject } from "../example/EmailComponentExample";
import { useEmailInput } from "../hooks/useEmailInput";
import EmailChip from "./EmailChip";

interface EmailInputProps {
	currentEmails: EmailObject[];
	handleAddEmail: (email: string) => boolean;
	handleDeleteEmail: (id: string) => void;
	removeErrors: () => void;
	setEmails: (emails: EmailObject[]) => void;
	setShowModal: (show: boolean) => void;
	showModal: boolean;
}

const EmailInput = ({
	currentEmails,
	handleAddEmail,
	handleDeleteEmail,
	removeErrors,
	setEmails,
	setShowModal,
	showModal,
}: EmailInputProps) => {
	const {
		inputValue,
		setInputValue,
		hiddenCount,
		containerRef,
		inputRef,
		chipRefs,
		deleteEmail,
		handleKeyDown,
		handleContainerClick,
	} = useEmailInput({
		currentEmails,
		handleAddEmail,
		handleDeleteEmail,
		setEmails,
		setShowModal,
	});

	const handleChipClick = (emailObj: EmailObject) => {
		setInputValue(emailObj.email);
		setEmails(currentEmails.filter((obj) => obj.id !== emailObj.id));
		chipRefs.current.delete(emailObj.id.toString());
		removeErrors();
		inputRef.current?.focus();
	};

	return (
		<div
			className="w-full text-input max-w-3xl min-w-72"
			ref={containerRef}
			onClick={handleContainerClick}
		>
			{currentEmails.slice(0, currentEmails.length - hiddenCount).map((obj) => (
				<EmailChip
					key={obj.id}
					email={obj.email}
					onDelete={() => deleteEmail(obj.id)}
					onClick={() => handleChipClick(obj)}
					ref={(el: HTMLDivElement | null) => {
						if (el) {
							chipRefs.current.set(obj.id.toString(), el.offsetWidth);
						}
					}}
				/>
			))}
			{hiddenCount > 0 && (
				<div
					className="email-chip cursor-pointer"
					onClick={() => setShowModal(!showModal)}
				>
					+{hiddenCount}
				</div>
			)}
			<input
				ref={inputRef}
				type="text"
				placeholder="add recipient"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
					removeErrors();
				}}
				onKeyDown={handleKeyDown}
				className="p-1 outline-none flex-grow min-w-40"
			/>
		</div>
	);
};

export default EmailInput;
