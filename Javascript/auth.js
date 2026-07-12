import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const authBtn = document.getElementById("auth-btn");
const mobileAuthBtn = document.getElementById("mobile-auth-btn");

const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const loginPopup = document.getElementById("loginPopup");

const isSignupFolder = window.location.pathname.includes("/signupandlogin/");
const loginPage = isSignupFolder ? "login.html" : "signupandlogin/login.html";

function updateButton(button, user) {
    if (!button) return;
    if (user) {
        button.textContent = "Log Out";
        button.href = "#";
        button.onclick = async (e) => {
            e.preventDefault();
            await signOut(auth);
            window.location.href = loginPage;
        };
    } else {
        button.textContent = "Log In";
        button.href = loginPage;
        button.onclick = null;
    }
}

await auth.authStateReady();
const user = auth.currentUser;

updateButton(authBtn, user);
updateButton(mobileAuthBtn, user);

if (user) {
    if (userNameEl) userNameEl.textContent = user.displayName || "Ocean Guardian User";
    if (userEmailEl) userEmailEl.textContent = user.email;
    if (loginPopup) loginPopup.classList.add("hidden");
} else {
    if (loginPopup) {
        loginPopup.classList.remove("hidden");
    }
}

const dashboardLinks = document.querySelectorAll('a[href*="dashboard.html"], #profile-btn, #mobile-profile-btn');
dashboardLinks.forEach(link => {
    if (!link) return;
    link.addEventListener("click", (e) => {
        if (!auth.currentUser) {
            if (loginPopup) {
                e.preventDefault();
                e.stopPropagation();
                loginPopup.classList.remove("hidden");
            }
        }
    });
});