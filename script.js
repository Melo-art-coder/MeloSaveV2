// ================================
// MELOSAVE V2
// ================================

// ---------- Notification ----------

function showNotification(message, color = "#6C3EF4") {

    let note = document.getElementById("notification");

    if (!note) {

        note = document.createElement("div");

        note.id = "notification";

        document.body.appendChild(note);

    }

    note.innerText = message;

    note.style.background = color;

    note.classList.add("show");

    setTimeout(() => {

        note.classList.remove("show");

    }, 3000);

}

// ---------- Theme ----------

const themeBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

}

themeBtn?.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        showNotification("🌙 Dark mode enabled");

    } else {

        localStorage.setItem("theme", "light");

        showNotification("☀️ Light mode enabled");

    }

});

// ---------- Register ----------

const signupForm = document.getElementById("signupForm");

signupForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = signupForm.querySelectorAll("input")[0].value;

    const email = signupForm.querySelectorAll("input")[1].value;

    const password = signupForm.querySelectorAll("input")[2].value;

    const confirm = signupForm.querySelectorAll("input")[3].value;

    if (password !== confirm) {

        showNotification("❌ Passwords do not match", "#ff3b30");

        return;

    }

    const user = {

        name,

        email,

        password,

        income:0,

        expenses:[],

        savings:0

    };

    localStorage.setItem("melosaveUser", JSON.stringify(user));

    showNotification("🎉 Account created successfully!");

    setTimeout(() => {

        location.href = "login.html";

    }, 1500);

});

// ---------- Login ----------

const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit", (e)=>{

    e.preventDefault();

    const email = loginForm.querySelectorAll("input")[0].value;

    const password = loginForm.querySelectorAll("input")[1].value;

    const user = JSON.parse(localStorage.getItem("melosaveUser"));

    if(!user){

        showNotification("No account found","#ff3b30");

        return;

    }

    if(email===user.email && password===user.password){

        showNotification("👋 Welcome back, "+user.name);

        setTimeout(()=>{

            location.href="dashboard.html";

        },1500);

    }else{

        showNotification("Incorrect email or password","#ff3b30");

    }

});
