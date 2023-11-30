import {createContext, useContext} from "react";

export enum Roles {
    Guest = 'guest',
    Admin = 'admin',
    Agent = 'agent',
    Crew = 'crew',
    Passenger = 'passenger'
}

export interface CurrentUserContextType {
    userId: number;
    role: Roles;
}
export const defaultUser = {
    userId: -1,
    role: Roles.Guest
}

const CurrentUserContext = createContext<CurrentUserContextType>(defaultUser);

// export const useCurrentUser = () => {
//     const currentUserContext = useContext(CurrentUserContext);
//
//     if (!currentUserContext) {
//         throw new Error(
//             "currentUserContext has to be used within <CurrentUserContext.Provider>"
//         );
//     }
//
//     return currentUserContext;
// }



export default CurrentUserContext;