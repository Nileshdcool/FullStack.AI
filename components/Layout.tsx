import React, { useState } from 'react';
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SubscriptionModal from './modals/SubscriptionModal';
import LoginSignupModal from './modals/LoginSignupModal';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginSignupModalOpen, setIsLoginSignupModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openLoginSignupModal = () => setIsLoginSignupModalOpen(true);
    const closeLoginSignupModal = () => setIsLoginSignupModalOpen(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header openModal={openModal} openLoginSignupModal={openLoginSignupModal}/>
                <main className="flex-1 p-4">{children}</main>
                <Footer />
            </div>
            <SubscriptionModal isModalOpen={isModalOpen} closeModal={closeModal} />
            <LoginSignupModal isModalOpen={isLoginSignupModalOpen} closeModal={closeLoginSignupModal} />
        </div>
    );
}