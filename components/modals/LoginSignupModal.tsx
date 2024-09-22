import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaGoogle, FaTimes } from 'react-icons/fa';

// Set the app element for react-modal
Modal.setAppElement('#__next');

interface LoginSignupModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    position: 'relative' as 'relative', // Ensure relative positioning for the close icon
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default function LoginSignupModal({ isModalOpen, closeModal }: LoginSignupModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Login Signup Modal"
    >
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <FaTimes className="text-2xl" />
      </button>
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form>
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input className="w-full p-2 border rounded" type="text" id="name" name="name" required />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input className="w-full p-2 border rounded" type="email" id="email" name="email" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input className="w-full p-2 border rounded" type="password" id="password" name="password" required />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-4" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
        <button className="text-blue-500 hover:underline" onClick={toggleMode}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>
      <div className="flex justify-around">
        <FaFacebook className="text-2xl cursor-pointer" />
        <FaTwitter className="text-2xl cursor-pointer" />
        <FaLinkedin className="text-2xl cursor-pointer" />
        <FaGithub className="text-2xl cursor-pointer" />
        <FaGoogle className="text-2xl cursor-pointer" />
      </div>
    </Modal>
  );
}