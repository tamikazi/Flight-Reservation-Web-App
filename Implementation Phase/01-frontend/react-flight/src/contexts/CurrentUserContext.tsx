import {createContext} from "react";

export enum Roles {
    Guest,
    Admin,
    Agent,
    Crew,
    Passenger
}

export interface CurrentUserContextType {
    userId: number;
    // role: Roles;
    role: number;
}
export const defaultUser = {
    userId: -1,
    // role: Roles.Guest
    role: Roles.Guest
}

const CurrentUserContext = createContext(defaultUser);


export default CurrentUserContext;