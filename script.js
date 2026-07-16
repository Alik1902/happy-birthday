const welcomeScreen = document.getElementById("welcomeScreen");
const openButton = document.getElementById("openButton");
const cardApp = document.getElementById("cardApp");
const slidesTrack = document.getElementById("slidesTrack");
const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dot")];
const currentSlideLabel = document.getElementById("currentSlide");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const revealGiftButton = document.getElementById("revealGiftButton");
const giftPolaroid = document.getElementById("giftPolaroid");
const giftTextCard = document.querySelector(".gift-text-card");
const heartsContainer = document.getElementById("heartsContainer");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function createHeartBurst(count = 18) {
  const symbols = ["❤️", "💗", "💕", "✨"];

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.setProperty("--duration", `${3.3 + Math.random() * 2.5}s`);
    heart.style.animationDelay = `${Math.random() * 0.8}s`;

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }
}

function updateSlider() {
  slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  currentSlideLabel.textContent = String(currentIndex + 1);

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateSlider();
}

openButton.addEventListener("click", () => {
  welcomeScreen.classList.add("is-leaving");
  createHeartBurst(24);

  setTimeout(() => {
    welcomeScreen.classList.add("is-hidden");
    cardApp.classList.remove("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 650);
});

prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

dots.forEach((dot) => {
  dot.addEventListener("click", () => goToSlide(Number(dot.dataset.index)));
});

document.addEventListener("keydown", (event) => {
  if (cardApp.classList.contains("is-hidden")) return;

  if (event.key === "ArrowLeft") goToSlide(currentIndex - 1);
  if (event.key === "ArrowRight") goToSlide(currentIndex + 1);
});

slidesTrack.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
  },
  { passive: true }
);

slidesTrack.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 45) return;
    distance > 0
      ? goToSlide(currentIndex - 1)
      : goToSlide(currentIndex + 1);
  },
  { passive: true }
);

revealGiftButton.addEventListener("click", () => {
  giftPolaroid.classList.add("is-revealed");
  giftTextCard.classList.add("is-revealed");
  createHeartBurst(32);
});

updateSlider();
