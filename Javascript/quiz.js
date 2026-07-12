import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCW5NUpP4XQnPL4ZIlLdl3zQbK5rq-X21I",
    authDomain: "ocean-guardian---sign-up-login.firebaseapp.com",
    projectId: "ocean-guardian---sign-up-login",
    storageBucket: "ocean-guardian---sign-up-login.firebasestorage.app",
    messagingSenderId: "705894712786",
    appId: "1:705894712786:web:7e9388cb837aab5433740b",
    measurementId: "G-D3WS8GL5R2"
};

// FIX: Check if Firebase is already initialized by auth.js or popup.js first!
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

if (typeof AOS !== "undefined") {
    AOS.init({
        once: true,
        offset: 100,
        duration: 800
    });
}

const profileBtn = document.getElementById("profile-btn");
const authBtn = document.getElementById("auth-btn");
const mobileAuthBtn = document.getElementById("mobile-auth-btn");
const loginPopup = document.getElementById("loginPopup");

// Handle Auth State safely alongside your other scripts
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (authBtn) {
            authBtn.textContent = "Log Out";
            authBtn.onclick = async (e) => {
                e.preventDefault();
                await signOut(auth);
                location.reload();
            };
        }
        if (mobileAuthBtn) {
            mobileAuthBtn.textContent = "Log Out";
            mobileAuthBtn.onclick = async (e) => {
                e.preventDefault();
                await signOut(auth);
                location.reload();
            };
        }
    } else {
        if (authBtn) {
            authBtn.textContent = "Log In";
            authBtn.href = "signupandlogin/login.html";
            authBtn.onclick = null;
        }
        if (mobileAuthBtn) {
            mobileAuthBtn.textContent = "Log In";
            mobileAuthBtn.href = "signupandlogin/login.html";
            mobileAuthBtn.onclick = null;
        }
    }
});

if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (auth.currentUser) {
            window.location.href = "signupandlogin/dashboard.html";
        } else {
            if (loginPopup) loginPopup.classList.remove("hidden");
            else alert("Please log in first.");
        }
    });
}

// Quiz Data
const quizzes = {
    ecosystem: [
        {
            question: "1. What is an ecosystem?",
            answers: [
                { text: "A group of animals living together", correct: false },
                { text: "A community of living things and their environment interacting together", correct: true },
                { text: "A place where only plants grow", correct: false },
                { text: "A large body of seawater", correct: false }
            ],
            explanation: "An ecosystem includes living organisms such as plants and animals, as well as non-living things like water, sunlight, rocks, and soil that interact with one another."
        },
        {
            question: "2. Which ecosystem provides a home for young fish and protects coastlines?",
            answers: [
                { text: "Desert", correct: false },
                { text: "Grassland", correct: false },
                { text: "Mangrove Forest", correct: true },
                { text: "Coral Reef", correct: false }
            ],
            explanation: "Mangrove forests provide shelter and breeding grounds for many young marine animals while protecting coastlines from erosion and strong waves."
        },
        {
            question: "3. Which of these is NOT a marine ecosystem?",
            answers: [
                { text: "Tropical Rainforest", correct: true },
                { text: "Open Ocean", correct: false },
                { text: "Mangrove Forest", correct: false },
                { text: "Coral Reef", correct: false }
            ],
            explanation: "A tropical rainforest is a land ecosystem, while coral reefs, mangrove forests, and the open ocean are marine ecosystems."
        },
        {
            question: "4. Why are coral reefs important?",
            answers: [
                { text: "They increase air pollution", correct: false },
                { text: "They provide habitats for many marine animals", correct: true },
                { text: "They make seawater warmer", correct: false },
                { text: "They reduce the amount of fish", correct: false }
            ],
            explanation: "Coral reefs provide food, shelter, and breeding areas for thousands of marine species, helping maintain ocean biodiversity."
        },
        {
            question: "5. Why is biodiversity important in an ecosystem?",
            answers: [
                { text: "It makes ecosystems more stable and resilient", correct: true },
                { text: "It increases the amount of pollution in the environment", correct: false },
                { text: "It prevents all animals from becoming extinct", correct: false },
                { text: "It allows one species to dominate the ecosystem", correct: false }
            ],
            explanation: "Biodiversity helps ecosystems stay balanced and recover more easily from environmental changes because many different species perform different roles."
        },
        {
            question: "6. Coral bleaching mainly happens because...",
            answers: [
                { text: "The ocean becomes too cold", correct: false },
                { text: "Sea levels rise", correct: false },
                { text: "Ocean temperatures become too high", correct: true },
                { text: "There is too much rainfall", correct: false }
            ],
            explanation: "Warmer ocean temperatures cause corals to lose the algae that live inside them, leading to coral bleaching."
        },
        {
            question: "7. Which activity is <strong>MOST</strong> likely to damage a coral reef ecosystem?",
            answers: [
                { text: "Using sustainable fishing methods", correct: false },
                { text: "Planting mangrove trees", correct: false },
                { text: "Recycling plastic waste", correct: false },
                { text: "Dropping anchors directly onto coral reefs", correct: true }
            ],
            explanation: "Anchors can break and crush coral colonies, causing long-term damage to the reef ecosystem."
        },
        {
            question: "8. Which animal depends on coral reefs for food or shelter?",
            answers: [
                { text: "Clownfish", correct: true },
                { text: "Camel", correct: false },
                { text: "Penguin", correct: false },
                { text: "Elephant", correct: false }
            ],
            explanation: "Clownfish live among sea anemones found in coral reefs, where they find protection and food."
        }
    ],
    animal: [
        {
            question: "1. What does it mean if a marine animal is endangered?",
            answers: [
                { text: "It is the largest animal in the ocean", correct: false },
                { text: "It can only live in freshwater", correct: false },
                { text: "It is at risk of becoming extinct", correct: true },
                { text: "It is dangerous to humans", correct: false }
            ],
            explanation: "An endangered marine animal is one that is at risk of becoming extinct if it is not protected."
        },
        {
            question: "2. Which is the world's most endangered marine mammal?",
            answers: [
                { text: "Blue Whale", correct: false },
                { text: "Vaquita", correct: true },
                { text: "Bottlenose Dolphin", correct: false },
                { text: "Orca", correct: false }
            ],
            explanation: "The Vaquita is the world's rarest marine mammal. It is a small porpoise found only in the northern Gulf of California, Mexico."
        },
        {
            question: "3. Which endangered marine animal is the largest animal on Earth?",
            answers: [
                { text: "Blue Whale", correct: true },
                { text: "Whale Shark", correct: false },
                { text: "Sperm Whale", correct: false },
                { text: "Giant Squid", correct: false }
            ],
            explanation: "The Blue Whale is the largest animal ever known to have lived on Earth. It can grow up to 30 metres long and weigh over 180 tonnes."
        },
        {
            question: "4. Which of these animals is <strong>NOT</strong> an endangered marine animal?",
            answers: [
                { text: "Whale Shark", correct: false },
                { text: "Green Sea Turtle", correct: false },
                { text: "Clownfish", correct: true },
                { text: "Vaquita", correct: false }
            ],
            explanation: "Clownfish are not classified as endangered. Whale Sharks, Green Sea Turtles, and Vaquitas are all endangered or critically endangered marine species."
        },
        {
            question: "5. Which endangered marine fish is the largest fish in the world?",
            answers: [
                { text: "Tuna", correct: false },
                { text: "Whale Shark", correct: true },
                { text: "Great White Shark", correct: false },
                { text: "Swordfish", correct: false }
            ],
            explanation: "The Whale Shark is the largest fish in the world. Although it can grow over 12 metres long, it feeds mainly on tiny plankton and is harmless to humans."
        }
    ],
    threats: [
        {
            question: "1. What are the main threats to endangered marine animals?",
            answers: [
                { text: "Plastic pollution, overfishing, habitat destruction, and climate change", correct: true },
                { text: "Heavy rainfall, strong winds, and ocean waves", correct: false },
                { text: "Swimming, diving, and boating", correct: false },
                { text: "Seaweed, coral reefs, and mangrove forests", correct: false }
            ],
            explanation: "Endangered marine animals face many threats, including <strong>plastic pollution</strong>, <strong>overfishing</strong>, <strong>habitat destruction</strong>, and <strong>climate change</strong>. These threats reduce food sources, destroy habitats, and make it harder for marine species to survive."
        },
        {
            question: "2. What is overfishing?",
            answers: [
                { text: "Fishing only during the daytime", correct: false },
                { text: "Catching fish faster than they can reproduce", correct: true },
                { text: "Fishing in freshwater lakes", correct: false },
                { text: "Catching small fish with a net", correct: false }
            ],
            explanation: "Overfishing happens when fish are caught faster than they can replace their population, leading to declining fish stocks."
        },
        {
            question: "3. Why is plastic pollution harmful to marine life?",
            answers: [
                { text: "It improves water quality", correct: false },
                { text: "Plastic makes them swim faster", correct: false },
                { text: "It helps fish find food", correct: false },
                { text: "Marine animals may eat it or become trapped in it", correct: true }
            ],
            explanation: "Plastic can injure or kill marine animals through ingestion or entanglement."
        },
        {
            question: "4. Which threat is mainly caused by rising ocean temperatures?",
            answers: [
                { text: "Strong ocean currents", correct: false },
                { text: "Coral bleaching", correct: true },
                { text: "Earthquakes", correct: false },
                { text: "Tsunami", correct: false }
            ],
            explanation: "Warmer oceans cause corals to lose the algae living inside them, resulting in coral bleaching."
        },
        {
            question: "5. Which activity contributes <strong>MOST</strong> to marine pollution?",
            answers: [
                { text: "Riding a bicycle", correct: false },
                { text: "Planting trees", correct: false },
                { text: "Recycling paper", correct: false },
                { text: "Throwing rubbish into rivers", correct: true }
            ],
            explanation: "Rubbish thrown into rivers often flows into the ocean, harming marine ecosystems."
        },
        {
            question: "6. Which of the following is NOT a threat to marine life?",
            answers: [
                { text: "Oil spills", correct: false },
                { text: "Plastic pollution", correct: false },
                { text: "Beach clean-up activities", correct: true },
                { text: "Overfishing", correct: false }
            ],
            explanation: "Beach clean-ups help remove rubbish from the environment, while the other options are threats to marine ecosystems."
        },
        {
            question: "7. Why is litter left on the beach still a threat to marine life?",
            answers: [
                { text: "It can be washed into the ocean by rain or waves", correct: true },
                { text: "It disappears naturally overnight", correct: false },
                { text: "It only affects birds", correct: false },
                { text: "It improves beach habitats", correct: false }
            ],
            explanation: "Litter left on beaches often ends up in the ocean, where it can harm marine animals."
        },
        {
            question: "8. Which of these is the <strong>BEST</strong> way to reduce threats to marine life?",
            answers: [
                { text: "Catch more fish every year", correct: false },
                { text: "Reduce pollution, protect habitats, and fish sustainably", correct: true },
                { text: "Throw biodegradable waste into the sea", correct: false },
                { text: "Build more roads near beaches", correct: false }
            ],
            explanation: "Reducing pollution, protecting marine habitats, and using sustainable fishing practices help keep marine ecosystems healthy."
        },
    ],
    action: [
        {
            question: "1. Which action is the <strong>BEST</strong> way to reduce plastic pollution in the ocean?",
            answers: [
                { text: "Use reusable bags and bottles", correct: true },
                { text: "Throw rubbish into rivers", correct: false },
                { text: "Burn plastic waste", correct: false },
                { text: "Leave litter on the beach", correct: false }
            ],
            explanation: "Using reusable items reduces the amount of single-use plastic that can end up in the ocean."
        },
        {
            question: "2. Why is recycling important for marine conservation?",
            answers: [
                { text: "It increases ocean temperatures", correct: false },
                { text: "It creates more plastic waste", correct: false },
                { text: "It damages coral reefs", correct: false },
                { text: "It helps reduce waste that may enter the ocean", correct: true }
            ],
            explanation: "Recycling helps reduce the amount of waste that may enter the ocean, protecting marine life."
        },
        {
            question: "3. Which action helps protect coral reefs while snorkeling or diving?",
            answers: [
                { text: "Collect coral as souvenirs", correct: false },
                { text: "Feed marine animals", correct: false },
                { text: "Avoid touching or standing on the corals", correct: true },
                { text: "Drop anchors near the reef", correct: false }
            ],
            explanation: "Corals are living animals that are easily damaged by touching, stepping on, or collecting them."
        },
        {
            question: "4. Which daily habit can help protect marine life?",
            answers: [
                { text: "Reduce the use of single-use plastics", correct: true },
                { text: "Waste water whenever possible", correct: false },
                { text: "Throw rubbish into drains", correct: false },
                { text: "Leave litter in public places", correct: false }
            ],
            explanation: "Small daily actions, like reducing plastic use, can make a big difference in protecting marine life."
        },
        {
            question: "5. Why should consumers avoid buying products made from endangered marine animals?",
            answers: [
                { text: "It helps animals reproduce more quickly", correct: false },
                { text: "It reduces demand for illegal wildlife products", correct: true },
                { text: "It encourages marine tourism", correct: false },
                { text: "It makes seafood cheaper", correct: false }
            ],
            explanation: "Lower demand discourages illegal hunting and trade, helping endangered species recover."
        },
        {
            question: "6. Why is public awareness important in marine conservation?",
            answers: [
                { text: "It guarantees the ocean will become pollution-free", correct: false },
                { text: "It replaces the need for environmental laws", correct: false },
                { text: "Informed people are more likely to make environmentally responsible choices", correct: true },
                { text: "It immediately restores damaged ecosystems", correct: false }
            ],
            explanation: "Education encourages individuals and communities to adopt sustainable habits that benefit marine life."
        },
        {
            question: "7. Which action BEST reduces water pollution before it reaches the ocean?",
            answers: [
                { text: "Disposing of chemicals and oils at approved collection centres", correct: true },
                { text: "Pouring used cooking oil into the sink", correct: false },
                { text: "Washing paintbrushes in storm drains", correct: false },
                { text: "Throwing litter into rivers", correct: false }
            ],
            explanation: "Proper disposal prevents harmful substances from entering waterways and eventually the ocean."
        },
    ]
};

let currentQuiz = [];
let currentQuizType = "";
let currentQuestion = 0;
let score = 0;
let answered = false;

// Start Quiz Logic
window.startQuiz = function(type) {
    if (!auth.currentUser) {
        if (loginPopup) loginPopup.classList.remove("hidden");
        return;
    }

    currentQuiz = quizzes[type];
    currentQuizType = type;
    currentQuestion = 0;
    score = 0;

    const hero = document.querySelector(".quiz-hero");
    const cards = document.querySelector(".quiz-section");
    const quiz = document.getElementById("quizBox");

    hero.style.transition = "opacity .5s ease";
    cards.style.transition = "opacity .5s ease";

    hero.style.opacity = "0";
    cards.style.opacity = "0";

    setTimeout(() => {
        hero.style.display = "none";
        cards.style.display = "none";
        quiz.classList.remove("hidden");

        window.scrollTo({ top: 0, behavior: "smooth" });

        quiz.style.opacity = "0";
        quiz.style.transform = "translateY(40px)";

        setTimeout(() => {
            quiz.style.transition = ".5s";
            quiz.style.opacity = "1";
            quiz.style.transform = "translateY(0)";
        }, 100);

        showQuestion();
    }, 500);
};

function showQuestion() {
    answered = false;
    const q = currentQuiz[currentQuestion];

    document.getElementById("question").innerHTML = q.question;
    document.getElementById("questionCounter").innerHTML = `Question ${currentQuestion + 1} / ${currentQuiz.length}`;
    document.getElementById("progressBar").style.width = `${((currentQuestion + 1) / currentQuiz.length) * 100}%`;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    const explanation = document.getElementById("explanation");
    explanation.classList.add("hidden");
    explanation.innerHTML = "";

    const nextBtn = document.getElementById("nextBtn");
    if (currentQuestion === currentQuiz.length - 1) {
        nextBtn.innerHTML = "Finish <i class='fa-solid fa-flag-checkered'></i>";
    } else {
        nextBtn.innerHTML = "Next Question <i class='fa-solid fa-arrow-right'></i>";
    }
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.className = "answerBtn";
        btn.innerHTML = answer.text;

        btn.onclick = function () {
            document.querySelectorAll(".answerBtn").forEach(button => {
                button.disabled = true;
            });

            answered = true;
            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";
            nextBtn.style.cursor = "pointer";

            if (answer.correct) {
                btn.classList.add("correct");
                score++;
            } else {
                btn.classList.add("wrong");
                document.querySelectorAll(".answerBtn").forEach((button, index) => {
                    if (q.answers[index].correct) {
                        button.classList.add("correct");
                    }
                });
            }

            if (q.explanation) {
                explanation.innerHTML = "<strong>💡 Explanation:</strong><br>" + q.explanation;
                explanation.classList.remove("hidden");
            }
        };
        answers.appendChild(btn);
    });
}

function bindNextButton() {
    const nextBtn = document.getElementById("nextBtn");

    nextBtn.addEventListener("click", () => {

        console.log("Current:", currentQuestion);
        console.log("Total:", currentQuiz.length);

        if (currentQuestion === currentQuiz.length - 1) {
            showResult();
        } else {
            currentQuestion++;
            showQuestion();
        }

    });
}

bindNextButton();

// Show Result
async function showResult() {

    let medal = "🥈";

    if (score === currentQuiz.length) {
        medal = "🥇";
    } else if (score >= currentQuiz.length * 0.7) {
        medal = "🥉";
    }

    if (auth.currentUser) {
        try {

            await setDoc(
                doc(db, "users", auth.currentUser.uid),
                {
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email
                },
                { merge: true }
            );

            await setDoc(
                doc(db, "users", auth.currentUser.uid, "progress", currentQuizType),
                {
                    completed: true,
                    score: score,
                    totalQuestions: currentQuiz.length,
                    perfectScore: score === currentQuiz.length,
                    completedAt: new Date()
                }
            );

            console.log("Quiz progress saved!");

        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    }

    document.getElementById("quizBox").innerHTML = `
        <div class="result">
            <h2>${medal} Quiz Completed!</h2>

            <div class="result-score">
                ${score}/${currentQuiz.length}
            </div>

            <p>Great job learning about ocean conservation!</p>

            <button onclick="restartQuiz()">
                Play Again
            </button>

            <br><br>

            <button onclick="goBack()">
                Back to Quiz Selection
            </button>
        </div>
    `;
}

window.restartQuiz = function() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quizBox").innerHTML = `
        <div class="quiz-header">
            <span id="questionCounter"></span>
            <div class="progress"><div id="progressBar"></div></div>
        </div>
        <div class="question-box">
            <h2 id="question"></h2>
            <div id="answers"></div>
            <div id="explanation" class="explanation hidden"></div>
            <button id="nextBtn">Next Question <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    `;
    bindNextButton();
    showQuestion();
};

window.goBack = function() {
    location.reload();
};

// Navbar & Card Event Listeners
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu-links");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("show");
    });
}

const quizCards = document.querySelectorAll(".quiz-card");
quizCards.forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.quiz;
        startQuiz(type);
    });
});