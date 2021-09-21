import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	FC,
} from "react";

interface ChannelState {
	channel: { channelID: string; name: string; timeAtClick: number };
}

interface ChannelStateProps {
	children: ReactNode;
}

interface ChannelAction {
	type: string;
	payload: { channelID: string; name: string; timeAtClick: number };
}

type ChannelDispatch = (action: ChannelAction) => void;

/* instead of creating one context and destructing later, create two now and export the context = neater */
const ChannelStateContext = createContext({} as ChannelState);
const ChannelDispatchContext = createContext({} as ChannelDispatch);

const channelReducer = (
	state: ChannelState,
	action: ChannelAction
): ChannelState => {
	switch (action.type) {
		case "CHANNEL":
			return {
				...state,
				channel: action.payload,
			};
		default:
			throw new Error(`Unkown action type: ${action.type}`);
	}
};

export const ChannelProvider: FC<ChannelStateProps> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(channelReducer, {
		channel: { channelID: "1", name: "General Channel", timeAtClick: 0 },
	});
	return (
		<ChannelDispatchContext.Provider value={dispatch}>
			<ChannelStateContext.Provider value={state}>
				{children}
			</ChannelStateContext.Provider>
		</ChannelDispatchContext.Provider>
	);
};

/* the export of the above two createContext functions */
export const useChannelState = () => useContext(ChannelStateContext);
export const useChannelDispatch = () => useContext(ChannelDispatchContext);
