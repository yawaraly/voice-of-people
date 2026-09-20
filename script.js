// Loading screen
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loading").classList.add("hide");
  }, 1000);
});

// Theme toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});
// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

// Load reports from localStorage and display them
  window.onload = function () {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const container = document.getElementById("issueContainer");

    reports.reverse().forEach((r) => {
      const card = document.createElement("div");
      card.className = "issue-card";
      card.innerHTML = `
        <h3>📍 ${r.address}</h3>
        <p><strong>Category:</strong> ${r.category}</p>
        <p><strong>Desc:</strong> ${r.description}</p>
        <p><strong>Anonymous:</strong> ${r.anonymous ? "Yes" : "No"}</p>
        <p><strong>Time:</strong> ${r.timestamp}</p>
        ${r.photos.map((p) => `<img src="${p}" width="150" style="margin: 5px;" />`).join("")}
        <hr />
      `;
      container.appendChild(card);
    });
  };
const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));
});

// FAQ Toggle Function
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  const isActive = button.classList.contains("active");

  // Close all other FAQs
  document.querySelectorAll(".faq-question").forEach((q) => {
    q.classList.remove("active");
    q.nextElementSibling.classList.remove("active");
  });

  // Toggle current FAQ
  if (!isActive) {
    button.classList.add("active");
    answer.classList.add("active");
  }
}

// Filter functionality
function applyFilters() {
  const wardFilter = document.getElementById("wardFilter").value;
  const issueFilter = document.getElementById("issueFilter").value;
  const locationSearch = document
    .getElementById("locationSearch")
    .value.toLowerCase();

  const cards = document.querySelectorAll(".issue-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardWard = card.getAttribute("data-ward");
    const cardIssue = card.getAttribute("data-issue");
    const cardText = card.textContent.toLowerCase();

    let showCard = true;

    // Ward filter
    if (wardFilter && cardWard !== wardFilter) {
      showCard = false;
    }

    // Issue filter
    if (issueFilter && !cardIssue.includes(issueFilter)) {
      showCard = false;
    }

    // Location search
    if (locationSearch && !cardText.includes(locationSearch)) {
      showCard = false;
    }

    if (showCard) {
      card.style.display = "block";
      card.style.animation = `cardSlideIn 0.8s ease-out ${
        visibleCount * 0.1
      }s both`;
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Show message if no results
  if (visibleCount === 0) {
    showNoResultsMessage();
  } else {
    hideNoResultsMessage();
  }
}

function showNoResultsMessage() {
  let noResultsMsg = document.getElementById("no-results");
  if (!noResultsMsg) {
    noResultsMsg = document.createElement("div");
    noResultsMsg.id = "no-results";
    noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 60px 20px; color: #6c757d;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
            <h3 style="margin-bottom: 10px; color: #2c3e50;">No Issues Found</h3>
            <p>Try adjusting your filters or search terms.</p>
            <button onclick="clearFilters()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 25px; cursor: pointer;">Clear Filters</button>
          </div>
        `;
    document.getElementById("cardContainer").appendChild(noResultsMsg);
  }
  noResultsMsg.style.display = "block";
}

function hideNoResultsMessage() {
  const noResultsMsg = document.getElementById("no-results");
  if (noResultsMsg) {
    noResultsMsg.style.display = "none";
  }
}

function clearFilters() {
  document.getElementById("wardFilter").value = "";
  document.getElementById("issueFilter").value = "";
  document.getElementById("locationSearch").value = "";

  const cards = document.querySelectorAll(".issue-card");
  cards.forEach((card, index) => {
    card.style.display = "block";
    card.style.animation = `cardSlideIn 0.8s ease-out ${index * 0.1}s both`;
  });

  hideNoResultsMessage();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add floating animation to hero section
const heroSection = document.querySelector(".hero-section");
let mouseX = 0;
let mouseY = 0;

heroSection.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 100;
  mouseY = (e.clientY / window.innerHeight) * 100;

  heroSection.style.transform = `translate(${mouseX * 0.01}px, ${
    mouseY * 0.01
  }px)`;
});

// Add parallax effect to sections
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero-section::before");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add click animation to cards
document.querySelectorAll(".issue-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

// Add dynamic typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats");
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/\D/g, ""));
        if (number) {
          animateCounter(counter, number);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
});

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add search functionality to location input
document
  .getElementById("locationSearch")
  .addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    if (searchTerm.length > 2) {
      applyFilters();
    } else if (searchTerm.length === 0) {
      clearFilters();
    }
  });

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    document.getElementById("locationSearch").focus();
  }

  // Escape to clear search
  if (e.key === "Escape") {
    document.getElementById("locationSearch").blur();
    clearFilters();
  }
});

// Add page visibility API for performance
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running";
  }
});

console.log(
  "🏙️ Voice of People loaded successfully! Ready to make your city better."
);
