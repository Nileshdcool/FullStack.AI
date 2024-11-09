import Modal from 'react-modal';
import { CSSProperties, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createCheckoutSession } from '../../services/stripeService'; // Import the method
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication


// Set the app element for react-modal
Modal.setAppElement('#__next');

interface SubscriptionModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openLoginSignupModal: () => void; // Add this prop
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
    width: '600px',
    height: '700px',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default function SubscriptionModal({
  isModalOpen,
  closeModal,
  openLoginSignupModal,
}: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [customerName, setCustomerName] = useState<string>(''); // Added customer name input state
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to store user email

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the user's email
      } else {
        setUserEmail(null); // No user is signed in
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);


  const handleCheckout = async () => {
    try {
      if (!userEmail) {
        // Close the subscription modal and open the login/signup modal
        closeModal();
        openLoginSignupModal();
        return;
      }
      setLoading(true);
      const res = await createCheckoutSession(getSelectedPlanAmount(), userEmail, getSelectedPlanDetails());
      if (res.url) {
        window.location.href = res.url; // Redirect user to Stripe's payment page
      } else {
        toast.error('Failed to create Stripe checkout session.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSelectedPlanAmount = () => {
    switch (selectedPlan) {
      case "plan1":
        return 3999; // $39.99 in cents
      case "plan2":
        return 4999; // $49.99 in cents
      case "plan3":
        return 6999; // $69.99 in cents
      default:
        return 0;
    }
  };

  const getSelectedPlanLabel = () => {
    switch (selectedPlan) {
      case "plan1":
        return "7 Days Access";
      case "plan2":
        return "20 Days Access";
      case "plan3":
        return "Lifetime Access";
      default:
        return "No Plan Selected";
    }
  };

  const getSelectedPlanDetails = () => {
    switch (selectedPlan) {
      case "plan1":
        return "Days7";
      case "plan2":
        return "Days20";
      case "plan3":
        return "Lifetime";
      default:
        return "Days0";
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Subscription Modal"
      style={customStyles}
    >
      <div className="space-y-4">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FaTimes className="text-2xl" />
        </button>
        <h2 className="text-xl font-bold text-center">Open 3877 Answers Now</h2>
        <p className="text-center">Don&apos;t Let Small Mistake Cost You a Job</p>
        <div className="flex justify-around space-x-4">
          <div
            className={`bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded shadow-md w-1/3 transform transition-transform hover:scale-105 cursor-pointer ${selectedPlan === "plan1" ? 'border-2 border-blue-500' : ''
              }`}
            onClick={() => setSelectedPlan("plan1")}
          >
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">$39.99 USD</p>
              <p>7 Days Access</p>
            </div>
          </div>
          <div
            className={`bg-gradient-to-r from-green-100 to-green-200 p-4 rounded shadow-md w-1/3 transform transition-transform hover:scale-105 cursor-pointer ${selectedPlan === "plan2" ? 'border-2 border-green-500' : ''
              }`}
            onClick={() => setSelectedPlan("plan2")}
          >
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">$49.99 USD</p>
              <p>20 Days Access</p>
            </div>
          </div>
          <div
            className={`bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded shadow-md w-1/3 transform transition-transform hover:scale-105 cursor-pointer ${selectedPlan === "plan3" ? 'border-2 border-purple-500' : ''
              }`}
            onClick={() => setSelectedPlan("plan3")}
          >
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">$69.99 USD</p>
              <p>Lifetime Access 🤘</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Your Subscription</h3>
        <p className="text-center text-gray-600 mb-4">
          You have selected the <span className="font-bold text-blue-600">{getSelectedPlanLabel()}</span> plan for
          <span className="font-bold text-blue-600"> ${((getSelectedPlanAmount()) / 100).toFixed(2)}</span>.
        </p>

        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading || !selectedPlan}
        >
          Proceed to Checkout ${((getSelectedPlanAmount()) / 100).toFixed(2)}
        </button>

        <div className="text-center mt-4">
          <p className="text-green-500">Great based on 86 Trustpilot Reviews</p>
          <p>“Great place to review your knowledge. Must be a go-to resource to prepare for a tough interview and get your dream job.”</p>
          <p>― Tam Huynh, Senior Rails Developer, ⭐⭐⭐⭐⭐</p>
        </div>
      </div>
    </Modal>
  );
}
