const paragraphs = document.querySelectorAll(".text-paragraph");
const detailsDiv = document.getElementById("details");

// Object to store details for each text
const detailsMap = {
  text1:
    "Easy-to-use, custom Savings Goals help you track your progress and reach every goal, from vacations and vehicles to emergency funds and retirement.",
  text2:
    "Create a customized budget by tracking your income and expenses. Understand your spending patterns and see the impact of new purchases on your financial goals instantly.",
  text3:
    "Projected cash flows let you see how your balances will change with upcoming income, bills, and subscriptions so you can plan ahead.",
  text4:
    "Robust analysis tools like performance charts, balance updates, and a personalized news feed provide powerful insights to help you grow your portfolio.",
  text5:
    "It’s easy to share your account with someone you trust. Give your partner or accountant their own login — they don’t even need their own subscription.",
};

// Function to display details for the clicked text
function displayDetails(paragraphId) {
  // Hide previous details
  detailsDiv.innerHTML = "";

  // Display details for the clicked text
  const detailsText = document.createElement("p");
  detailsText.textContent = detailsMap[paragraphId];
  detailsDiv.appendChild(detailsText);

  // Remove the 'active' class from all paragraphs
  paragraphs.forEach((p) => p.classList.remove("active"));

  // Add 'active' class to the clicked paragraph for styling
  document.getElementById(paragraphId).classList.add("active");
}

// Click event listener for each paragraph
paragraphs.forEach((paragraph) => {
  paragraph.addEventListener("click", () => {
    displayDetails(paragraph.id);
  });
});

// Click the first paragraph by default
displayDetails("text1");

document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", function () {
    // Show button when user scrolls down 300px
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    // Scroll to the top of the document with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

const wrapper = document.querySelector(".wrapper-2");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper-2 i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// section-5
const titles = document.querySelectorAll(".title");

// Add click event listeners to each title
titles.forEach((title) => {
  const button = title.querySelector(".button");
  const details = title.nextElementSibling;

  title.addEventListener("click", () => {
    if (button.classList.contains("fa-plus")) {
      // Open the clicked title
      button.classList.remove("fa-plus");
      button.classList.add("fa-minus");
      details.style.display = "block";
    } else {
      // Close the clicked title
      button.classList.remove("fa-minus");
      button.classList.add("fa-plus");
      details.style.display = "none";
    }
  });
});
