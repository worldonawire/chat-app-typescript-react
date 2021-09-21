import React, { useReducer, useContext, createContext, ReactNode } from "react";

type UserState = {
	user: string;
};

type UserAction = {
	type: "USER";
	payload: string;
};

type UserDispatch = (action: UserAction) => void;

/* instead of creating one context and destructing later, create two now and export the context = neater */
const UserStateContext = createContext({} as UserState);
const UserDispatchContext = createContext({} as UserDispatch);

const userReducer = (state: UserState, action: UserAction) => {
	switch (action.type) {
		case "USER":
			return {
				...state,
				user: action.payload,
			};
		default:
			throw new Error(`Unkown action type: ${action.type}`);
	}
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, {
		user: "Sam",
	});
	return (
		<UserDispatchContext.Provider value={dispatch}>
			<UserStateContext.Provider value={state}>
				{children}
			</UserStateContext.Provider>
		</UserDispatchContext.Provider>
	);
};

/* the export of the above two createContext functions */
export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
