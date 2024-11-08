import { useEffect } from "react";

export function useResizeUpdate(callback: () => void, dependencies: any[]) {
	useEffect(() => {
		callback();
		window.addEventListener("resize", callback);
		return () => window.removeEventListener("resize", callback);
	}, [callback, ...dependencies]);
}
