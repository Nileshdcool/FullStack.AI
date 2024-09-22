import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import SlideDown from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';


interface HeaderProps {
  openModal: () => void;
  openLoginSignupModal: () => void;
}

export default function Header({ openModal, openLoginSignupModal }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
    <div className="flex items-center">
      <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
      <h1 className="text-2xl font-bold">FullStack.AI</h1>
    </div>
    <div className="flex items-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={openLoginSignupModal}>Login</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded mr-4" onClick={openModal}>Unlock 5000+ Answers</button>
      <Avatar
        src="/avatar.png"
        size="40"
        round={true}
        alt="Avatar"
        onClick={toggleMenu}
        style={{ cursor: 'pointer' }}
      />
      <SlideDown>
        {isMenuOpen && (
          <div className="menu">
            <ul>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/settings">Settings</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        )}
      </SlideDown>
    </div>
  </header>
  );
}