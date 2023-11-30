import {createContext, PropsWithChildren, useContext, useState} from "react";

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

const CurrentUserContext = createContext<{
    currentUser: CurrentUserContextType;
    setCurrentUser: React.Dispatch<any>;
}>({
    currentUser: defaultUser,
    setCurrentUser: () => null
});

// export const CurrentUserProvider = ({ children }: PropsWithChildren<{}>) => {
//     const [currentUser, setCurrentUser] = useState<CurrentUserContextType>(defaultUser);
//
//     return(
//         <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
//             {children}
//         </CurrentUserContext.Provider>
//     )
// }

export default CurrentUserContext;