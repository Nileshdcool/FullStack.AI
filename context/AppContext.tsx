import React, { createContext, useState, ReactNode, useEffect } from 'react';
import 'firebase/compat/auth'; // Ensure you're using the correct Firebase auth
import firebase from 'firebase/compat/app';
import { getAuth, signOut, User } from "firebase/auth"; // Import signOut from Firebase
import { getSubscriptionByUserId } from '@/services/stripeService';

interface AppContextProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    handleIndustryChange: (event: string) => void;
    selectedIndustry: string;
    user: User | null;  // Use firebase.User
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isSubscribed: boolean; // Add isSubscribed flag
    logout: () => void; // Logout function
    setIsSubscribedFlag: (flag: boolean) => Promise<void>; // Change to return Promise<void>
}

export const AppContext = createContext<AppContextProps>({
    isSidebarCollapsed: false,
    toggleSidebar: () => { },
    handleIndustryChange: () => { },
    selectedIndustry: '',
    user: null,
    setUser: () => { },
    isSubscribed: false, // Initialize as false
    logout: () => { },
    setIsSubscribedFlag: async () => { }, // Provide a default async function
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('IT');
    const [user, setUser] = useState<User | null>(null); // Add user state
    const [isSubscribed, setIsSubscribed] = useState(false); // Add isSubscribed state

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user); // Set user if logged in

                // Fetch subscription status for the logged-in user
                const userEmail = user.email; // Get user email
                if (userEmail) {
                    const subscriptionStatus = await getSubscriptionByUserId(userEmail); // Fetch subscription status
                    setIsSubscribed(subscriptionStatus); // Set isSubscribed based on API response
                }
            } else {
                setUser(null); // Reset user if logged out
                setIsSubscribed(false); // Reset subscription status
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    const handleIndustryChange = (event: string) => {
        setSelectedIndustry(event);
    };

    const setIsSubscribedFlag = async (flag: boolean): Promise<void> => {
        setIsSubscribed(flag); // Reset subscription status
    }

    // Logout function that clears user data
    const logout = async () => {
        const auth = getAuth(); // Get the Firebase auth instance
        try {
            await signOut(auth); // Sign out from Firebase
            setUser(null); // Clear user state in your app
            setIsSubscribed(false); // Clear subscription status on logout
            window.location.href = "http://localhost:3000";
            console.log("User logged out from Firebase");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AppContext.Provider value={{
            isSidebarCollapsed,
            toggleSidebar,
            handleIndustryChange,
            selectedIndustry,
            user,
            setUser,
            isSubscribed, // Provide isSubscribed flag
            logout,
            setIsSubscribedFlag
        }}>
            {children}
        </AppContext.Provider>
    );
};
