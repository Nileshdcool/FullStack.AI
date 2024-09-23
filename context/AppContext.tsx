import React, { createContext, useState, ReactNode, SetStateAction } from 'react';

interface AppContextProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    handleIndustryChange: (event: string) => void;
    selectedIndustry: string;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('IT');

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    const handleIndustryChange = (event: string) => {
        setSelectedIndustry(event);
      }

    return (
        <AppContext.Provider value={{ isSidebarCollapsed, toggleSidebar, handleIndustryChange, selectedIndustry }}>
            {children}
        </AppContext.Provider>
    );
};