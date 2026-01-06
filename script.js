// ===== Interactive Buttons =====

// Move "No" button randomly
const noBtn = document.getElementById('no');
noBtn.addEventListener('mouseover', () => {
  const x = Math.random() * 80;
  const y = Math.random() * 80;
  noBtn.style.position = 'absolute';
  noBtn.style.left = x + '%';
  noBtn.style.top = y + '%';
});

// Confetti for "Yes"
const yesBtn = document.getElementById('yes');
yesBtn.addEventListener('click', () => {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
  alert("I love you too! 🥰");
});

// ===== Countdown Timer =====

// First monthsary & first meet-sary dates
const monthsaryStart = new Date(2025, 11, 18); // December 18, 2025
const meetsaryStart = new Date(2025, 8, 8);    // September 8, 2025

// Function to get next occurrence of day in this month or next month
function getNextMonthlyDate(day) {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  if (now.getDate() >= day) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
  return new Date(year, month, day, 0, 0, 0);
}

// Function to calculate nth event
function getNthMonthlyEvent(firstDate, nextDate) {
  let nth = 1;
  let tempDate = new Date(firstDate);
  while (
    tempDate.getFullYear() < nextDate.getFullYear() ||
    (tempDate.getFullYear() === nextDate.getFullYear() && tempDate.getMonth() < nextDate.getMonth())
  ) {
    tempDate.setMonth(tempDate.getMonth() + 1);
    nth++;
  }
  return nth;
}

// Helper function for ordinal suffix
function getOrdinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return n + "th";
  switch (n % 10) {
    case 1: return n + "st";
    case 2: return n + "nd";
    case 3: return n + "rd";
    default: return n + "th";
  }
}

// Update countdown every second
function updateCountdown() {
  const now = new Date();

  // ----- Next Monthsary -----
  const nextMonthsary = getNextMonthlyDate(18);
  const diffMonthsary = nextMonthsary - now;

  const monthsaryDays = Math.floor(diffMonthsary / (1000 * 60 * 60 * 24));
  const monthsaryHours = Math.floor((diffMonthsary / (1000 * 60 * 60)) % 24);
  const monthsaryMinutes = Math.floor((diffMonthsary / (1000 * 60)) % 60);
  const monthsarySeconds = Math.floor((diffMonthsary / 1000) % 60);

  const monthsPassed = getNthMonthlyEvent(monthsaryStart, nextMonthsary);

  document.getElementById('monthsary-timer').innerText =
    `${monthsaryDays}d ${monthsaryHours}h ${monthsaryMinutes}m ${monthsarySeconds}s`;
  document.getElementById('monthsary-number').innerText = getOrdinal(monthsPassed);

  // ----- Next Meet-sary -----
  const nextMeetsary = getNextMonthlyDate(8);
  const diffMeetsary = nextMeetsary - now;

  const meetsaryDays = Math.floor(diffMeetsary / (1000 * 60 * 60 * 24));
  const meetsaryHours = Math.floor((diffMeetsary / (1000 * 60 * 60)) % 24);
  const meetsaryMinutes = Math.floor((diffMeetsary / (1000 * 60)) % 60);
  const meetsarySeconds = Math.floor((diffMeetsary / 1000) % 60);

  const meetsPassed = getNthMonthlyEvent(meetsaryStart, nextMeetsary);

  document.getElementById('meetsary-timer').innerText =
    `${meetsaryDays}d ${meetsaryHours}h ${meetsaryMinutes}m ${meetsarySeconds}s`;
  document.getElementById('meetsary-number').innerText = getOrdinal(meetsPassed);
}

// Run countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();
