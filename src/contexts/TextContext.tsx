import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	FC,
    useEffect,
} from "react";

type TextState = {
	text: string
};

interface TextStateProps {
	children: ReactNode;
}
type TextAction = {
    type: string;
    payload: string;
}
type TextDispatch = (action: TextAction) => void;

/* instead of creating one context and destructing later, create two now and export the context = neater */
const TextStateContext = createContext({} as TextState);
const TextDispatchContext = createContext({} as TextDispatch);

const textReducer = (state: TextState, action: TextAction) => {
	switch (action.type) {
		case "TEXT":
			return {
				...state,
				text: action.payload,
			};
		default:
			throw new Error(`Unkown action type: ${action.type}`);
	}
};

export const TextProvider: FC<TextStateProps> = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(textReducer, { text: "" }, () => {
        const localData = localStorage.getItem('text')
        return localData ? JSON.parse(localData) : { text: "" };
    });
    useEffect(() => {
        localStorage.setItem('text', JSON.stringify(state))
    }, [state])
	return (
		<TextDispatchContext.Provider value={dispatch}>
			<TextStateContext.Provider value={state}>
				{children}
			</TextStateContext.Provider>
		</TextDispatchContext.Provider>
	);
};

/* the export of the above two createContext functions */
export const useTextState = () => useContext(TextStateContext);
export const useTextDispatch = () => useContext(TextDispatchContext);
