import React, {
	createContext,
	useReducer,
	useContext,
	ReactNode,
	FC,
} from "react";

type UserState = {
	user: string;
};

type UserAction = {
	type: "USER";
	payload: string;
};

type UserDispatch = (action: UserAction) => void;