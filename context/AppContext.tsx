import React, { createContext, useState, ReactNode, SetStateAction } from 'react';
import 'firebase/compat/auth'; // Ensure you're using the correct Firebase auth
import firebase from 'firebase/compat/app';
import { getAuth, signOut, User } from "firebase/auth"; // Import signOut from Firebase

interface AppContextProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    handleIndustryChange: (event: string) => void;
    selectedIndustry: string;
    user: User | null;  // Use firebase.User
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void; // Logout function
}

export const AppContext = createContext<AppContextProps>({
    isSidebarCollapsed: false,
    toggleSidebar: () => { },
    handleIndustryChange: () => { },
    selectedIndustry: '',
    user: null,
    setUser: () => { },
    logout: () => { },
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('IT');
    const [user, setUser] = useState<User | null>(null); // Add user state

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    const handleIndustryChange = (event: string) => {
        setSelectedIndustry(event);
    }

    // Logout function that clears user data
    const logout = async () => {
        const auth = getAuth(); // Get the Firebase auth instance
        try {
            await signOut(auth); // Sign out from Firebase
            setUser(null); // Clear user state in your app
            console.log("User logged out from Firebase");
        } catch (error) {
            console.error("Error logging out:", error); // Handle any errors that occur during logout
        }
    };

    return (
        <AppContext.Provider value={{ isSidebarCollapsed, toggleSidebar, handleIndustryChange, selectedIndustry, user, setUser, logout }}>
            {children}
        </AppContext.Provider>
    );
};
