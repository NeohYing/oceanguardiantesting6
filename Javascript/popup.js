import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCW5NUpP4XQnPL4ZIlLdl3zQbK5rq-X21I",
    authDomain: "ocean-guardian---sign-up-login.firebaseapp.com",
    projectId: "ocean-guardian---sign-up-login",
    storageBucket: "ocean-guardian---sign-up-login.firebasestorage.app",
    messagingSenderId: "705894712786",
    appId: "1:705894712786:web:7e9388cb837aab5433740b",
    measurementId: "G-D3WS8GL5R2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginPopup = document.getElementById("loginPopup");

const dashboardLinks = document.querySelectorAll('a[href="signupandlogin/dashboard.html"]');

dashboardLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        if (!auth.currentUser && loginPopup) {
            e.preventDefault();
            e.stopPropagation();
            loginPopup.classList.remove("hidden");
        }
    });
});