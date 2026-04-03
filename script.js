// 🔥 Navbar Sticky on Scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 50);
});


// 🔥 Smooth Scroll (for nav links)
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// 🔥 Booking Validation
document.querySelector(".search-btn").addEventListener("click", () => {
  const checkIn = document.querySelectorAll("input")[0].value;
  const checkOut = document.querySelectorAll("input")[1].value;

  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates!");
  } else {
    alert("Checking availability...");
  }
});


// 🔥 Scroll Animation (Fade In)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});


// 🔥 Button Click Effect
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});