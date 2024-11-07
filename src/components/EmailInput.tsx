import { useCallback, useEffect, useRef, useState } from "react";
import { EmailObject } from "../App";

interface EmailInputProps {
	currentEmails: EmailObject[];
	handleAddEmail: (email: string) => boolean;
	handleDeleteEmail: (id: number) => void;
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
	const [inputValue, setInputValue] = useState<string>("");
	const [hiddenCount, setHiddenCount] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const chipRefs = useRef<Map<string, number>>(new Map());

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			const response = handleAddEmail(inputValue);
			response && setInputValue("");
		} else if (
			e.key === "Backspace" &&
			inputValue === "" &&
			currentEmails.length > 0
		) {
			// Put the last email back into the input for editing
			const lastEmail = currentEmails[currentEmails.length - 1];
			setInputValue(lastEmail.email);
			setEmails(currentEmails.slice(0, -1));
			chipRefs.current.delete(lastEmail.id.toString());
		}
	};

	const deleteEmail = (id: number) => {
		handleDeleteEmail(id);
		updateHiddenCount();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		removeErrors();
	};

	const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === containerRef.current) {
			inputRef.current?.focus();
		}
	};

	const updateHiddenCount = useCallback(() => {
		if (!containerRef.current || !inputRef.current) return;

		const containerWidth = containerRef.current.clientWidth;
		const inputWidth = inputRef.current.offsetWidth;
		let totalWidth = inputWidth;
		let visibleChipCount = 0;

		// Calculate how many chips can fit within the available space
		for (const [id, chipWidth] of chipRefs.current.entries()) {
			console.log("chipWidth", chipWidth);
			if (totalWidth + chipWidth > containerWidth) break;
			totalWidth += chipWidth;
			visibleChipCount += 1;
			console.log(
				"totalWidth",
				totalWidth,
				"containerWidth",
				containerWidth,
				"inputWidth",
				inputWidth
			);
		}
		console.log(chipRefs, "chipRefs");

		setHiddenCount(currentEmails.length - visibleChipCount);
		currentEmails.length - visibleChipCount < 1 && setShowModal(false);
	}, [currentEmails]);

	// Measure chip width when a new email is added
	useEffect(() => {
		updateHiddenCount();
		console.log("hiddenCount", hiddenCount);
		window.addEventListener("resize", updateHiddenCount);
		return () => window.removeEventListener("resize", updateHiddenCount);
	}, [currentEmails, updateHiddenCount, inputValue]);

	return (
		<div
			className="w-full text-input bg-white cursor-text"
			ref={containerRef}
			onClick={(e) => handleContainerClick(e)}
		>
			{currentEmails.slice(0, currentEmails.length - hiddenCount).map((obj) => (
				<div
					key={obj.id}
					className="email-chip cursor-auto"
					ref={(el) => {
						if (el) {
							chipRefs.current.set(obj.id.toString(), el.offsetWidth);
						}
					}}
				>
					{obj.email}
					<button
						type="button"
						className="hover:opacity-70 flex items-center"
						onClick={() => deleteEmail(obj.id)}
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>
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
				onChange={(e) => handleChange(e)}
				onKeyDown={handleKeyDown}
				className="p-1 outline-none grow-0 min-w-32 "
			/>
		</div>
	);
};

export default EmailInput;
