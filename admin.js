const reportTotal = document.getElementById("reportTotal");
const reportActive = document.getElementById("reportActive");
const reportPending = document.getElementById("reportPending");
const activeBar = document.getElementById("activeBar");
const pendingBar = document.getElementById("pendingBar");
const menuItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll(".section");
const userTable = document.getElementById("userTable");
const totalUsers = document.getElementById("totalUsers");
const themeBtn = document.getElementById("themeBtn");

/* MENU SWITCHING (NO BACKEND) */
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    item.classList.add("active");
    document.getElementById(item.dataset.target).classList.add("active");
  });
});

/* FETCH DATA FROM FREE API */
userTable.innerHTML = `<tr><td colspan="4">Loading users from API...</td></tr>`;

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(users => {

    /* USERS TABLE */
    userTable.innerHTML = "";
    totalUsers.textContent = users.length;

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td class="status">Active</td>
      `;
      userTable.appendChild(row);
    });

    /* REPORTS LOGIC */
    const total = users.length;
    const active = Math.floor(total * 0.7);   // simulate active
    const pending = total - active;

    reportTotal.textContent = total;
    reportActive.textContent = active;
    reportPending.textContent = pending;

    activeBar.style.width = (active / total) * 100 + "%";
    pendingBar.style.width = (pending / total) * 100 + "%";
  });


/* DARK MODE */
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
});
const darkToggle = document.getElementById("darkToggle");
const fontSizeSelect = document.getElementById("fontSize");

/* LOAD SAVED SETTINGS */
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkToggle.checked = true;
}

const savedFont = localStorage.getItem("fontSize");
if (savedFont) {
  document.body.style.fontSize = savedFont;
  fontSizeSelect.value = savedFont;
}

/* DARK MODE SETTING */
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", darkToggle.checked);
});

/* FONT SIZE SETTING */
fontSizeSelect.addEventListener("change", () => {
  document.body.style.fontSize = fontSizeSelect.value;
  localStorage.setItem("fontSize", fontSizeSelect.value);
});
