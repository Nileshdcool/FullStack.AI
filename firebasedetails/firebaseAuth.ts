import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore functions
import { addLoginHistory } from "@/services/loginHistory";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Set persistence to local storage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth state persistence set to local storage");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });


const trackLoginHistory = async (user: any) => {
  try {
    debugger;

    const loginData = {
      userId: user.uid,
      email: user.email,
      loginTime: new Date().toISOString(), // Store current timestamp
      sessionDuration: '', // Initially set to empty, calculate later if needed
      sessionStatus: 'Logged In' // Set status to logged in
    };

    const loginDetails = await addLoginHistory(loginData);
    localStorage.setItem("loginHistoryId", loginDetails.data.documentId);

    console.log("Login history recorded successfully.");
  } catch (error) {
    console.error("Error recording login history:", error);
  }
};

const getSessionKey = (user: any) => {
  return `session-${user?.uid}`; // Unique key based on user ID
};

const trackSession = async (user: any) => {
  debugger;
  const sessionKey = getSessionKey(user);
  // Check if the session is already tracked in localStorage
  const isSessionTracked = localStorage.getItem(sessionKey);

  if (!isSessionTracked) {
    try {
      // Track login and mark session as tracked
      await trackLoginHistory(user);
      console.log("Login history recorded.");

      // Store session in localStorage to avoid duplicate logs on refresh
      localStorage.setItem(sessionKey, "true");
    } catch (error) {
      console.error("Error recording login history:", error);
    }
  }
};

// Clear session when the user logs out
export const clearSession = (user: any) => {
  const sessionKey = getSessionKey(user);
  localStorage.removeItem(sessionKey); // Remove the session from localStorage
};


// Listen for authentication state changes
 onAuthStateChanged(auth, async (user) => {
  debugger;
  if (user) {
    await trackSession(user);

    // User is signed in, track login
    //trackLoginHistory(user);
  } else {
    console.log("User is signed out.");
  }
});

// Export the Firebase authentication object
export { auth };
