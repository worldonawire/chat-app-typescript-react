import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	FC,
} from "react";

interface ErrorState {
	errMessage: {
		messageId: string;
		text: string;
		userId: string;
		timeAtError: string | undefined;
	};
}

interface ErrorStateProps {
	children: ReactNode;
}

interface ErrorAction {
	type: string;
	payload: {
		messageId: string;
		text: string;
		userId: string;
		timeAtError: string | undefined;
	};
}

type ErrorDispatch = (action: ErrorAction) => void;

/* instead of creating one context and destructing later, create two now and export the context = neater */
const ErrorStateContext = createContext({} as ErrorState);
const ErrorDispatchContext = createContext({} as ErrorDispatch);

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
	switch (action.type) {
		case "ERROR_MESSAGE":
			return {
				...state,
				errMessage: action.payload,
			};
		default:
			throw new Error(`Unkown action type: ${action.type}`);
	}
};

export const ErrorProvider: FC<ErrorStateProps> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(errorReducer, {
		errMessage: {
			messageId: " ",
			text: " ",
			userId: " ",
			timeAtError: undefined,
		},
	});
	return (
		<ErrorDispatchContext.Provider value={dispatch}>
			<ErrorStateContext.Provider value={state}>
				{children}
			</ErrorStateContext.Provider>
		</ErrorDispatchContext.Provider>
	);
};

/* the export of the above two createContext functions */
export const useErrorState = () => useContext(ErrorStateContext);
export const useErrorDispatch = () => useContext(ErrorDispatchContext);
