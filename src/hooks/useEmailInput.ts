import { useCallback, useEffect, useRef, useState } from "react";
import { EmailObject } from "../example/EmailComponentExample";
import { useResizeUpdate } from "./useResizeUpdate";

interface UseEmailInputProps {
	currentEmails: EmailObject[];
	handleAddEmail: (email: string) => boolean;
	handleDeleteEmail: (id: string) => void;
	setEmails: (emails: EmailObject[]) => void;
	setShowModal: (show: boolean) => void;
}

export function useEmailInput({
	currentEmails,
	handleAddEmail,
	handleDeleteEmail,
	setEmails,
	setShowModal,
}: UseEmailInputProps) {
	const [inputValue, setInputValue] = useState<string>("");
	const [hiddenCount, setHiddenCount] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const chipRefs = useRef<Map<string, number>>(new Map());

	const addEmailFromInput = () => {
		const response = handleAddEmail(inputValue);
		if (response) setInputValue("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (["Enter", " ", ","].includes(e.key)) {
			e.preventDefault();
			addEmailFromInput();
		} else if (
			e.key === "Backspace" &&
			inputValue === "" &&
			currentEmails.length > 0
		) {
			const lastEmail = currentEmails[currentEmails.length - 1];
			setInputValue(lastEmail.email);
			setEmails(currentEmails.slice(0, -1));
			chipRefs.current.delete(lastEmail.id.toString());
		}
	};

	const deleteEmail = (id: string) => {
		handleDeleteEmail(id);
		updateHiddenCount();
	};

	const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === containerRef.current) {
			inputRef.current?.focus();
		}
	};

	const updateHiddenCount = useCallback(() => {
		if (!containerRef.current || !inputRef.current) return;
		const minInputWidth = 160;
		const containerWidth = containerRef.current.clientWidth;
		const inputWidth = minInputWidth;
		let totalWidth = inputWidth;
		let visibleChipCount = 0;

		for (const chipWidth of chipRefs.current.values()) {
			if (totalWidth + chipWidth > containerWidth) break;
			totalWidth += chipWidth;
			visibleChipCount += 1;
		}
		setHiddenCount(currentEmails.length - visibleChipCount);
		currentEmails.length - visibleChipCount < 1 && setShowModal(false);
	}, [currentEmails]);

	useResizeUpdate(updateHiddenCount, [currentEmails, inputValue]);

	return {
		inputValue,
		setInputValue,
		hiddenCount,
		containerRef,
		inputRef,
		chipRefs,
		deleteEmail,
		handleKeyDown,
		handleContainerClick,
		updateHiddenCount,
	};
}
