import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// NOTE: This JS file is for the pages: credits

if (typeof AOS !== "undefined") {
    AOS.init({
        once: true,
        offset: 100,
        duration: 800
    });
}

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

const profileBtn = document.getElementById("profile-btn");
const authBtn = document.getElementById("auth-btn");

console.log("Profile button:", profileBtn);
console.log("Auth button:", authBtn);

onAuthStateChanged(auth, (user) => {
    
    if (!authBtn) return;

    if (user) {

        authBtn.textContent = "Log Out";

        authBtn.onclick = async (e) => {

            e.preventDefault();

            await signOut(auth);

            location.reload();

        };

    } else {

        authBtn.textContent = "Log In";
        authBtn.href = "signupandlogin/login.html";

    }

});

if (profileBtn) {

    profileBtn.addEventListener("click", (e) => {

        e.preventDefault();

        if (auth.currentUser) {

            window.location.href = "signupandlogin/dashboard.html";

        } else {

            alert("Please log in first.");

        }

    });

}

// Below is unrelated to sign up and login
// AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800
        });
    }

// 

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".credit-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            const content = button.nextElementSibling;

            if(content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }

        });

    });

});

// Navbar - Mobile navbar
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu-links");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("show");
        
        if (!navMenu.classList.contains("show")) {
            document.querySelectorAll(".nav-dropdown-wrapper").forEach(el => {
                el.classList.remove("open");
            });
        }
    });
}

// Navbar - Dropdown
const trigger = document.querySelector(".dynamic-trigger");
const dropdown = document.querySelector(".nav-dropdown-wrapper");

if (trigger && dropdown) {
    trigger.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            dropdown.classList.toggle("open");
        }
    });
}

document.querySelectorAll(".nav-menu-links a:not(.dynamic-trigger)").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("show");
            if (dropdown) dropdown.classList.remove("open");
        }
    });
});