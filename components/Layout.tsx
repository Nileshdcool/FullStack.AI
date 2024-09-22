import React, { useState } from 'react';
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SubscriptionModal from './modals/SubscriptionModal';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleSidebar = () => {
        throw new Error('Simulated login error');
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex min-h-screen">
           <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
            <div className="flex-1 flex flex-col">
                <Header openModal={openModal} />
                <main className="flex-1 p-4">{children}</main>
                <Footer />
            </div>
           <SubscriptionModal isModalOpen={isModalOpen} closeModal={closeModal}/>
        </div>
    );
}