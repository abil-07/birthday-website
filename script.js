/* ==========================================================
   HAPPY BIRTHDAY WEBSITE
   Version : 2.0
   Author  : Abil & ChatGPT
========================================================== */

/* ==========================================================
   CONFIG
========================================================== */

const CONFIG = {
    typingSpeed: 35,
    letterSpeed: 20,
    flashDuration: 600,
    openDuration: 900,
    letterDelay: 1800,
    heartInterval: 1200,
    revealThreshold: 0.15,
    confettiParticles: 180
};

/* ==========================================================
   DOM ELEMENT
========================================================== */

const body = document.body;

const opening = document.getElementById("opening");
const birthday = document.getElementById("birthday");
const letter = document.getElementById("letter");
const reasons = document.getElementById("reasons");
const ending = document.getElementById("ending");

const envelope = document.getElementById("openLetter");

const flash = document.querySelector(".flash");

const music = document.getElementById("music");

const typing = document.getElementById("typing");

const letterText = document.getElementById("letterText");

const reasonCards = document.querySelectorAll(".reason-card");

/* ==========================================================
   TEXT
========================================================== */

const birthdayMessage =
"Selamat ulang tahun yaa, Bebe Mbut ❤️ Semoga hari ini penuh dengan senyuman, kebahagiaan, dan semua doa baik yang kamu harapkan bisa terkabul.";

const myLetter = `Selamat Ulang Tahun, Bebe ❤️

Hari ini adalah hari yang spesial buat kamu.

Walaupun kita lagi berjauhan, aku tetap ingin menjadi salah satu orang yang membuat hari ini terasa lebih berkesan buat kamu.

Website kecil ini memang sederhana, tapi setiap bagian yang ada di dalamnya aku buat dengan penuh rasa sayang dan ketulusan.

Terima kasih yaa sudah hadir di hidup aku.

Terima kasih sudah menjadi seseorang yang selalu bisa membuat aku tersenyum, walaupun kadang juga bikin gemes sendiri. 🤍

Semoga semua impian kamu satu per satu bisa tercapai.

Semoga kesehatan, kebahagiaan, rezeki, dan semua hal baik selalu menemani setiap langkah kamu.

Dan semoga...

Aku masih bisa ikut merayakan banyak ulang tahun kamu berikutnya. ❤️

Happy Birthday, Bebe.

I Love You ❤️`;

/* ==========================================================
   GLOBAL VARIABLE
========================================================== */

let birthdayTyped = false;

let letterTyped = false;

let musicStarted = false;

let heartInterval = null;

/* ==========================================================
   INITIAL SETUP
========================================================== */

body.style.overflow = "hidden";

birthday.classList.add("hidden");
letter.classList.add("hidden");
reasons.classList.add("hidden");
ending.classList.add("hidden");

/* ==========================================================
   TYPE WRITER
========================================================== */

function typeWriter(text, element, speed = 35, callback = null) {

    element.innerHTML = "";

    let index = 0;

    function type() {

        if (index >= text.length) {

            if (callback) callback();

            return;

        }

        const char = text.charAt(index);

        if (char === "\n") {

            element.innerHTML += "<br>";

        } else {

            element.innerHTML += char;

        }

        index++;

        let delay = speed;

        if (char === ".") delay += 180;

        if (char === ",") delay += 80;

        if (char === "!") delay += 180;

        if (char === "?") delay += 180;

        setTimeout(type, delay);

    }

    type();

}
/* ==========================================================
   FLOATING HEART
========================================================== */

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (18 + Math.random() * 20) + "px";

    heart.style.animationDuration = (5 + Math.random() * 3) + "s";

    heart.style.opacity = 0.4 + Math.random() * 0.6;

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}

function startHeartAnimation() {

    if (heartInterval) return;

    heartInterval = setInterval(createHeart, CONFIG.heartInterval);

}

/* ==========================================================
   MUSIC
========================================================== */

function startMusic() {

    if (musicStarted) return;

    musicStarted = true;

    if (!music) return;

    music.volume = 0.5;

    music.play().catch(() => {});

}

/* ==========================================================
   CONFETTI
========================================================== */

function launchConfetti() {

    if (typeof confetti !== "function") return;

    confetti({

        particleCount: CONFIG.confettiParticles,

        spread: 120,

        origin: {
            y: 0.65
        }

    });

}

/* ==========================================================
   OPEN WEBSITE
========================================================== */

function openWebsite() {

    envelope.classList.add("open");

    flash.classList.add("show");

    startMusic();

    launchConfetti();

    startHeartAnimation();

    setTimeout(() => {

        flash.classList.remove("show");

    }, CONFIG.flashDuration);

    setTimeout(() => {

        opening.classList.add("hidden");

        birthday.classList.remove("hidden");

        letter.classList.remove("hidden");

        reasons.classList.remove("hidden");

        ending.classList.remove("hidden");

        body.style.overflowY = "auto";

        if (!birthdayTyped) {

            birthdayTyped = true;

            typeWriter(

                birthdayMessage,

                typing,

                CONFIG.typingSpeed

            );

        }

        setTimeout(() => {

            if (!letterTyped) {

                letterTyped = true;

                typeWriter(

                    myLetter,

                    letterText,

                    CONFIG.letterSpeed

                );

            }

        }, CONFIG.letterDelay);

    }, CONFIG.openDuration);

}

/* ==========================================================
   EVENT
========================================================== */

if (envelope) {

    envelope.addEventListener("click", openWebsite);

}
/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealElements = document.querySelectorAll(
    "#birthday, #letter, #reasons, #ending, .reason-card"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        });

    },

    {
        threshold: CONFIG.revealThreshold
    }

);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});

/* ==========================================================
   REASON CARD STAGGER ANIMATION
========================================================== */

const cardObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            reasonCards.forEach((card, index) => {

                setTimeout(() => {

                    card.classList.add("show");

                }, index * 180);

            });

            cardObserver.unobserve(entry.target);

        });

    },

    {
        threshold: 0.3
    }

);

if (reasons) {

    cardObserver.observe(reasons);

}

/* ==========================================================
   ENDING CONFETTI
========================================================== */

let endingPlayed = false;

const endingObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            if (endingPlayed) return;

            endingPlayed = true;

            launchEndingConfetti();

        });

    },

    {
        threshold: 0.6
    }

);

if (ending) {

    endingObserver.observe(ending);

}

function launchEndingConfetti() {

    if (typeof confetti !== "function") return;

    const duration = 2500;

    const end = Date.now() + duration;

    const interval = setInterval(() => {

        if (Date.now() > end) {

            clearInterval(interval);

            return;

        }

        confetti({

            particleCount: 8,

            angle: 60,

            spread: 70,

            origin: {
                x: 0
            }

        });

        confetti({

            particleCount: 8,

            angle: 120,

            spread: 70,

            origin: {
                x: 1
            }

        });

    }, 180);

}

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.documentElement.style.scrollBehavior = "smooth";

/* ==========================================================
   MUSIC LOOP SAFETY
========================================================== */

if (music) {

    music.addEventListener("ended", () => {

        music.currentTime = 0;

        music.play().catch(() => {});

    });

}

/* ==========================================================
   PAGE READY
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
/* ==========================================================
   MUSIC BUTTON
========================================================== */

const musicButton = document.createElement("button");

musicButton.id = "musicBtn";

musicButton.innerHTML = "🎵";

musicButton.title = "Play / Pause Music";

document.body.appendChild(musicButton);

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    if (!music) return;

    if (music.paused) {

        music.play();

        musicButton.classList.add("playing");

        musicPlaying = true;

    } else {

        music.pause();

        musicButton.classList.remove("playing");

        musicPlaying = false;

    }

});

/* ==========================================================
   AUTO UPDATE MUSIC BUTTON
========================================================== */

if (music) {

    music.addEventListener("play", () => {

        musicButton.classList.add("playing");

    });

    music.addEventListener("pause", () => {

        musicButton.classList.remove("playing");

    });

}

/* ==========================================================
   SPARKLE EFFECT
========================================================== */

function createSparkle(x, y) {

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";

    sparkle.style.left = x + "px";

    sparkle.style.top = y + "px";

    sparkle.innerHTML = "✨";

    document.body.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 1200);

}

if (envelope) {

    envelope.addEventListener("mousemove", (e) => {

        if (Math.random() > 0.85) {

            createSparkle(e.clientX, e.clientY);

        }

    });

}

/* ==========================================================
   LETTER CURSOR
========================================================== */

const cursor = document.createElement("span");

cursor.className = "typing-cursor";

cursor.innerHTML = "|";

if (letterText) {

    letterText.after(cursor);

}

/* ==========================================================
   REMOVE CURSOR AFTER TYPING
========================================================== */

setTimeout(() => {

    if (cursor) {

        cursor.remove();

    }

}, 15000);

/* ==========================================================
   BACK TO TOP
========================================================== */

const topButton = document.createElement("button");

topButton.id = "topBtn";

topButton.innerHTML = "↑";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================================
   PAGE VISIBILITY
========================================================== */

document.addEventListener("visibilitychange", () => {

    if (!music) return;

    if (document.hidden) {

        music.pause();

    } else if (musicPlaying) {

        music.play().catch(() => {});

    }

});

/* ==========================================================
   PRELOAD IMAGE
========================================================== */

window.addEventListener("load", () => {

    document.querySelectorAll("img").forEach(img => {

        const preload = new Image();

        preload.src = img.src;

    });

});

/* ==========================================================
   FINISH
========================================================== */

console.log("❤️ Happy Birthday Website Loaded Successfully ❤️");