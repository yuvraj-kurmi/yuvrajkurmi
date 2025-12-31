// HAMBURGER TOGGLE
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
  const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
  hamburger.setAttribute("aria-expanded", !expanded);
});

// Close menu on link click
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// TYPEWRITER EFFECT
class TypeWriter {
  constructor(
    element,
    phrases,
    typingSpeed = 100,
    erasingSpeed = 50,
    delay = 1500
  ) {
    this.element = element;
    this.phrases = phrases;
    this.typingSpeed = typingSpeed;
    this.erasingSpeed = erasingSpeed;
    this.delay = delay;
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.typing();
  }

  typing() {
    if (this.charIndex < this.phrases[this.phraseIndex].length) {
      this.element.textContent += this.phrases[this.phraseIndex].charAt(
        this.charIndex
      );
      this.charIndex++;
      setTimeout(() => this.typing(), this.typingSpeed);
    } else {
      setTimeout(() => this.erasing(), this.delay);
    }
  }

  erasing() {
    if (this.charIndex > 0) {
      this.element.textContent = this.phrases[this.phraseIndex].substring(
        0,
        this.charIndex - 1
      );
      this.charIndex--;
      setTimeout(() => this.erasing(), this.erasingSpeed);
    } else {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      setTimeout(() => this.typing(), this.typingSpeed);
    }
  }
}

// Initialize TypeWriter
document.addEventListener("DOMContentLoaded", () => {
  const typedText = document.getElementById("typed-text");
  const phrases = [
    "Full Stack Developer",
    "Python Specialist",
    "Cybersecurity Enthusiast",
  ];
  if (typedText) new TypeWriter(typedText, phrases, 100, 50, 1500);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Animate skill bars on scroll
const skillItems = document.querySelectorAll(".skill-item");

function animateSkillBars() {
  const trigger = window.innerHeight * 0.85;
  skillItems.forEach((skill, index) => {
    const top = skill.getBoundingClientRect().top;
    const fill = skill.querySelector(".skill-fill");
    if (top < trigger && !fill.style.width) {
      const skillValue = skill.dataset.skill;
      setTimeout(() => {
        fill.style.width = skillValue + "%";
      }, index * 150); // staggered animation
    }
  });
}

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

// REVEAL ON SCROLL WITH STAGGER
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el, i) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      setTimeout(() => el.classList.add("active"), i * 100); // stagger effect
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// SKILL BARS ANIMATION
const skillItem = document.querySelectorAll(".skills ul li");

function animateSkills() {
  const trigger = window.innerHeight * 0.85;
  skillItems.forEach((skill, i) => {
    const top = skill.getBoundingClientRect().top;
    if (top < trigger && !skill.classList.contains("fill")) {
      skill.classList.add("fill");
      const width = skill.dataset.skill;
      // Animate with delay
      setTimeout(() => {
        skill.style.setProperty("--skill-width", width + "%");
        skill
          .querySelector(".bar .fill")
          ?.style.setProperty("width", width + "%");
      }, i * 150);
    }
  });
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// OPTIONAL: FLOATING HERO IMAGE EFFECT
const heroImage = document.querySelector(".hero-image img");
window.addEventListener("mousemove", (e) => {
  if (!heroImage) return;
  const x = (window.innerWidth / 2 - e.clientX) / 50;
  const y = (window.innerHeight / 2 - e.clientY) / 50;
  heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
});
window.addEventListener("mouseout", () => {
  if (!heroImage) return;
  heroImage.style.transform = "translate(0, 0) scale(1)";
});
