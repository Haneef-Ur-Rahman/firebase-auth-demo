import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWpSgC6VSIi-UO0EQ8dhBnLkf6sMfFa1Q",
  authDomain: "portfoliocontactextraction.firebaseapp.com",
  projectId: "portfoliocontactextraction",
  storageBucket: "portfoliocontactextraction.appspot.com",
  messagingSenderId: "401274880352",
  appId: "1:401274880352:web:cd2706cae2afcfe5a55e05",
  measurementId: "G-BK4J080M4G",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// UI Elements
const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const toggleAuthMode = document.getElementById("toggleAuthMode");
const googleAuthBtn = document.getElementById("googleAuthBtn");

let isSignUp = true; // Tracks current mode (Sign Up / Sign In)

// Toggle between Sign Up and Sign In
toggleAuthMode.addEventListener("click", () => {
  isSignUp = !isSignUp;
  
  if (isSignUp) {
    formTitle.textContent = "Sign Up";
    submitBtn.textContent = "Sign Up";
    toggleAuthMode.textContent = "Already have an account? Sign In";
  } else {
    formTitle.textContent = "Sign In";
    submitBtn.textContent = "Sign In";
    toggleAuthMode.textContent = "Don't have an account? Sign Up";
  }
});

// Handle form submission (Sign Up / Sign In)
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    if (isSignUp) {
      // Sign Up with Email/Password
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } else {
      // Sign In with Email/Password
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
    }
    
    // Redirect after successful auth
    window.location.href = "https://haneef-ur-rahman.github.io/my-Portfolio/";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// Google Sign In / Sign Up
document.getElementById('googleAuthBtn').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in success:", result.user);
    window.location.href = "https://haneef-ur-rahman.github.io/my-Portfolio/";
  } catch (error) {
    console.error("Google sign-in error:", error);
    alert(`Google sign-in failed: ${error.message}\n\nEnsure you're on an authorized domain.`);
  }
});