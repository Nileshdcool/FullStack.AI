import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { FaFacebook, FaTwitter, FaGithub, FaGoogle, FaTimes } from 'react-icons/fa';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebasedetails/firebaseAuth';
import { AppContext } from '@/context/AppContext'; 
import { toast } from 'react-toastify';

// Set the app element for react-modal
Modal.setAppElement('#__next');

type SocialProvider = FacebookAuthProvider | GoogleAuthProvider | TwitterAuthProvider;

interface LoginSignupModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface FirebaseError {
  code: string;
  message: string;
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
    position: 'relative' as const,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default function LoginSignupModal({ isModalOpen, closeModal }: LoginSignupModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { user, setUser, logout } = useContext(AppContext) ?? {};

  const toggleMode = () => setIsLogin((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (userCredential && setUser) {
          setUser(userCredential.user);
        }
        closeModal();
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          toast.info('User created successfully');
          if (userCredential && setUser) {
            setUser(userCredential.user); 
          }
          closeModal();
        } catch (signUpError: unknown) {
          const error = signUpError as FirebaseError;
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email is already registered. Please log in instead.');
          } else {
            toast.error('Error during sign-up');
          }
        }
      }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error(isLogin ? 'Error logging in' : 'Error signing up', firebaseError);
      toast.error(isLogin ? 'Login failed. Please check your credentials.' : 'Sign-up failed. Please try again.');
    }
  };

  const socialLogin = async (provider: SocialProvider) => {
    try {
      closeModal();
      const userCredential = await signInWithPopup(auth, provider);
      console.log(userCredential.user);
      if (userCredential && setUser) {
        setUser(userCredential.user);
      }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      console.error(`Error logging in with ${provider.providerId}:`, firebaseError);
    }
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

      {user ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
          <button className="w-full bg-red-500 text-white p-2 rounded mb-4" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
              <input
                className="w-full p-2 border rounded"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
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
            <FaFacebook className="text-2xl cursor-pointer" onClick={() => socialLogin(new FacebookAuthProvider())} />
            <FaTwitter className="text-2xl cursor-pointer" onClick={() => socialLogin(new TwitterAuthProvider())} />
            <FaGoogle className="text-2xl cursor-pointer" onClick={() => socialLogin(new GoogleAuthProvider())} />
            <FaGithub className="text-2xl cursor-pointer" onClick={() => socialLogin(new GithubAuthProvider())} />
          </div>
        </>
      )}
    </Modal>
  );
}
