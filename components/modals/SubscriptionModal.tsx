import Modal from 'react-modal';
// Set the app element for react-modal
Modal.setAppElement('#__next');

import { CSSProperties } from 'react';
import { FaTimes } from 'react-icons/fa';

interface SubscriptionModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    customStyles?: CSSProperties;
}

// Define custom styles for the modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', // Fixed width
        height: '700px', // Fixed height
        padding: '20px', // Padding inside the modal
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
    },
};

export default function SubscriptionModal({ isModalOpen, closeModal }: SubscriptionModalProps) {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <div className="space-y-4">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <FaTimes className="text-2xl" />
                </button>
                <h2 className="text-xl font-bold text-center">Open 3877 Answers Now</h2>
                <p className="text-center">Don&#39;t Let Small Mistake Cost You a Job</p>
                <div className="flex justify-around space-x-4">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded shadow-md w-1/3 transform transition-transform hover:scale-105">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-blue-600">$39.99 USD</p>
                            <p>7 Days Access</p>
                        </div>
                        <div className="text-center mt-2">
                            <svg className="w-6 h-6 mx-auto" /* SVG content here */></svg>
                            <p>No PDF Export</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded shadow-md w-1/3 transform transition-transform hover:scale-105">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-blue-600">$49.99 USD</p>
                            <p>20 Days Access</p>
                        </div>
                        <div className="text-center mt-2">
                            <svg className="w-6 h-6 mx-auto" /* SVG content here */></svg>
                            <p>No PDF Export</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded shadow-md w-1/3 transform transition-transform hover:scale-105">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-blue-600">$69.99 USD</p>
                            <p>Lifetime Access 🤘</p>
                        </div>
                        <div className="text-center mt-2">
                            <svg className="w-6 h-6 mx-auto" /* SVG content here */></svg>
                            <p>PDF Export</p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-green-500">Great based on 86 Trustpilot Reviews</p>
                    <p>“Great place to review your knowledge. Must be a go-to resource to prepare for a tough interview and get your dream job.”</p>
                    <p>― Tam Huynh, Senior Rails Developer, ⭐⭐⭐⭐⭐</p>
                </div>
                <div className="text-center mt-4">
                    <p>Over 3000 Customers</p>
                    <p>• No BS or 100% Money 🛡️ Back</p>
                    <p>• Promo: CODE</p>
                </div>
                <div className="text-center mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign In with your Google account</button>
                    <p>to Unlock Answers with Paypal, Stripe, any Credit Card or 🔷Ethereum</p>
                    <p>Powered By</p>
                    <p>Terms Of Service • Questions or Invoices? • MLStack.Cafe</p>
                </div>
            </div>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </Modal>
    )
}