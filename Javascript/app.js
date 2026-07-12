// NOTE: This JS file is for the pages: Home, Endangered Marine Animals - filter, Ocean Map, & About page - FAQ.


import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Ocean Map
const modal = document.getElementById("oceanModal");
const modalContent = document.getElementById("modalContent");

if (modal && modalContent) {

    document.querySelectorAll(".ocean-marker").forEach(marker => {

        marker.addEventListener("click", () => {

            const ocean = oceans[marker.dataset.ocean];

            modalContent.innerHTML = `
                <button class="close-modal">
                    <i class='bx bx-x'></i>
                </button>

                <h2 class="ocean-title">${ocean.title}</h2>

                <p class="ocean-description">${ocean.description}</p>

                <img class="modal-image"
                    src="${ocean.image}"
                    alt="${ocean.animal}">

                <h3>Featured Animal</h3>

                <p>${ocean.animal}</p>

                <a href="${ocean.link}" class="learn-btn">
                    Learn More
                </a>
            `;

            modal.classList.add("active");

            modalContent
                .querySelector(".close-modal")
                .addEventListener("click", () => {
                    modal.classList.remove("active");
                });

        });

    });

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

}


// Ocean Filter

const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            document.querySelectorAll(".animal-row").forEach(card => {

                const oceans = (card.dataset.ocean || "").split(" ");

                if (filter === "all" || oceans.includes(filter)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }

            });

            document.querySelectorAll(".zone-section").forEach(section => {

                const heading = section.querySelector(".zone-text");

                const hasVisibleAnimal = [...section.querySelectorAll(".animal-row")]
                    .some(card => card.style.display !== "none");

                heading.style.display = hasVisibleAnimal ? "block" : "none";

            });

            // Left & Right cards
            document.querySelectorAll(".zone-section").forEach(section => {

                const visibleCards = [...section.querySelectorAll(".animal-row")]
                .filter(card => card.style.display !== "none");

                visibleCards.forEach((card, index) => {

                    if (index % 2 === 0) {
                        card.classList.remove("reverse");
                    } else {
                        card.classList.add("reverse");
                    }
                });
            });

            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 50);

        });

    });

}

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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
            initFAQAccordion();
            initSmoothNavigation();
        });

        function initFAQAccordion() {
            const faqTriggers = document.querySelectorAll('.faq-trigger');
            
            faqTriggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const activeItem = trigger.parentElement;
                    const contentPanel = activeItem.querySelector('.faq-content');
                    const isAlreadyActive = activeItem.classList.contains('active');
                    
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                        item.querySelector('.faq-content').style.maxHeight = null;
                    });
                    
                    if (!isAlreadyActive) {
                        activeItem.classList.add('active');
                        contentPanel.style.maxHeight = contentPanel.scrollHeight + "px";
                    }
                });
            });
        }
        function initSmoothNavigation() {
            const links = document.querySelectorAll('.main-navbar a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
                    if (this.classList.contains('menu-item')) {
                        this.classList.add('active');
                    }
                });
            });
        }