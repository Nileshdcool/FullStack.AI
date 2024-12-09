import Link from 'next/link';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Avatar from 'react-avatar';
import { AppContext } from '../context/AppContext';

interface HeaderProps {
  openModal: () => void;
  openLoginSignupModal: () => void;
}

export default function Header({ openModal, openLoginSignupModal }: HeaderProps) {
  const { user, logout, isSubscribed } = useContext(AppContext) ?? {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">Elevar.AI</h1>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Avatar
              src={user?.photoURL || ''}
              size="40"
              round={true}
              alt="Avatar"
              onClick={toggleMenu}
              style={{ cursor: 'pointer' }}
            />
            {isMenuOpen && (
              <div
                className="menu absolute bg-white shadow-lg rounded p-4"
                ref={menuRef}
                style={{ position: 'absolute', top: '50px', right: '0', zIndex: 10 }}
              >
                <ul className="space-y-2">
                  <li>
                    <Link href="/profile" className="block text-gray-700 hover:text-gray-900" onClick={closeMenu}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="block text-gray-700 hover:text-gray-900" onClick={closeMenu}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="w-full text-left text-gray-700 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {!isSubscribed && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded ml-4"
                onClick={openModal}
              >
                Unlock 5000+ Answers
              </button>
            )}
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              onClick={openLoginSignupModal}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-4"
              onClick={openModal}
            >
              Unlock 5000+ Answers
            </button>
          </>
        )}
      </div>
    </header>
  );
}
