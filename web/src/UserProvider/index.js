import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../Util/UseLocalStorage";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");

    const value = { jwt, setJwt };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}

export { useUser, UserProvider };
