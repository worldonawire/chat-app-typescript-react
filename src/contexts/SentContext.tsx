import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	FC,
} from "react";


interface SentState {
		sentMessage: boolean
	
}

interface SentStateProps {
	children: ReactNode;
}

interface SentAction {
	type: string;
	payload: boolean
}

type SentDispatch = (action: SentAction) => void;

/* instead of creating one context and destructing later, create two now and export the context = neater */
const SentStateContext = createContext({} as SentState);
const SentDispatchContext = createContext({} as SentDispatch);


const sentReducer = (state: SentState, action: SentAction): SentState => {
	switch (action.type) {
		case "SENT_MESSAGE":
			return {
				...state,
				sentMessage: action.payload,
			}
		default:
			throw new Error(`Unkown action type: ${action.type}`);
	}
};

export const SentProvider: FC<SentStateProps> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(sentReducer, {
        sentMessage: false,
	});
	return (
		<SentDispatchContext.Provider value={dispatch}>
			<SentStateContext.Provider value={state}>
				{children}
			</SentStateContext.Provider>
		</SentDispatchContext.Provider>
	);
};

/* the export of the above two createContext functions */
export const useSentState = () => useContext(SentStateContext);
export const useSentDispatch = () => useContext(SentDispatchContext);