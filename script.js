const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const menuClose = document.querySelector(".menu-close");
const typedText = document.getElementById("typed-text");
const skillItems = document.querySelectorAll(".skill-item");
const revealElements = document.querySelectorAll(".reveal");
const heroImage = document.querySelector(".hero-image img");

function toggleMenu() {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
}

hamburger.addEventListener("click", toggleMenu);
menuClose?.addEventListener("click", toggleMenu);
document.querySelectorAll(".menu a:not(.menu-close)").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

class TypeWriter {
  constructor(element, phrases, typingSpeed = 100, erasingSpeed = 50, delay = 1500) {
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
    if (!this.element) return;
    if (this.charIndex < this.phrases[this.phraseIndex].length) {
      this.element.textContent += this.phrases[this.phraseIndex].charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typing(), this.typingSpeed);
    } else {
      setTimeout(() => this.erasing(), this.delay);
    }
  }

  erasing() {
    if (!this.element) return;
    if (this.charIndex > 0) {
      this.element.textContent = this.phrases[this.phraseIndex].substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.erasing(), this.erasingSpeed);
    } else {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      setTimeout(() => this.typing(), this.typingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedText) {
    new TypeWriter(typedText, ["Full Stack Developer", "Python Specialist", "Cybersecurity Enthusiast"], 100, 50, 1500);
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (menu.classList.contains("active")) toggleMenu();
    }
  });
});

function animateSkillBars() {
  const trigger = window.innerHeight * 0.85;
  skillItems.forEach((skill, i) => {
    const top = skill.getBoundingClientRect().top;
    const fill = skill.querySelector(".skill-fill");
    if (top < trigger && fill && !fill.style.width) {
      const skillValue = skill.dataset.skill;
      setTimeout(() => { fill.style.width = skillValue + "%"; }, i * 150);
    }
  });
}

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el, i) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100 && !el.classList.contains("active")) {
      setTimeout(() => el.classList.add("active"), i * 100);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (heroImage && !isTouchDevice()) {
  window.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
  });
  window.addEventListener("mouseout", () => { heroImage.style.transform = "translate(0, 0) scale(1)"; });
}
