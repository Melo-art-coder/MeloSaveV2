// =====================================
// MELOSAVE PRO V2
// PART 1: CORE SYSTEM
// =====================================


// ================================
// STORAGE HELPERS
// ================================

function getUsers() {
    return JSON.parse(localStorage.getItem("meloUsers")) || [];
}


function saveUsers(users) {
    localStorage.setItem("meloUsers", JSON.stringify(users));
}


function getCurrentUser() {
    return JSON.parse(localStorage.getItem("meloCurrentUser")) || null;
}


function saveCurrentUser(user) {
    localStorage.setItem("meloCurrentUser", JSON.stringify(user));
}


function removeCurrentUser() {
    localStorage.removeItem("meloCurrentUser");
}


// ================================
// DEFAULT USER DATA
// ================================

function createDefaultData() {

    return {
        income: [],
        expenses: [],
        savings: [],
        transactions: [],
        budget: 0
    };

}


// ================================
// NOTIFICATION SYSTEM
// ================================

function showNotification(message, type = "success") {

    const notification = document.createElement("div");

    notification.className = `notification ${type}`;

    notification.innerText = message;


    document.body.appendChild(notification);


    setTimeout(() => {
        notification.remove();
    }, 3000);

}



// ================================
// DARK / LIGHT MODE
// ================================

const themeToggle = document.getElementById("themeToggle");


function loadTheme() {

    const savedTheme = localStorage.getItem("meloTheme");


    if(savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

}



function toggleTheme() {

    document.body.classList.toggle("dark-mode");


    const theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";


    localStorage.setItem("meloTheme", theme);


    showNotification(
        `${theme} mode activated`,
        "success"
    );

}



if(themeToggle){

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


loadTheme();



// ================================
// LOGIN CHECK
// ================================

function isLoggedIn(){

    return getCurrentUser() !== null;

}



// ================================
// SAFE PAGE START
// ================================

document.addEventListener(
"DOMContentLoaded",
()=>{

    console.log(
        "MeloSave Pro V2 Loaded 🚀"
    );


});    if(!user) return;

    const hour = new Date().getHours();

    let text = "";

    if(hour < 12){

        text = "Good Morning";

    }else if(hour < 18){

        text = "Good Afternoon";

    }else{

        text = "Good Evening";

    }

    greeting.textContent = `${text}, ${user.name} 👋`;

}

updateGreeting();    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        showNotification("🌙 Dark Mode Enabled");

    }else{

        localStorage.setItem("theme","light");

        showNotification("☀️ Light Mode Enabled");

    }

});


// ---------- Register ----------

const signupForm = document.getElementById("signupForm");

signupForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input");

    const name = inputs[0].value.trim();

    const email = inputs[1].value.trim().toLowerCase();

    const password = inputs[2].value;

    const confirm = inputs[3].value;

    if(password !== confirm){

        showNotification("❌ Passwords do not match","#ff3b30");

        return;

    }

    const user = {

        name:name,

        email:email,

        password:password,

        income:0,

        expenses:0,

        savings:0,

        balance:0,

        transactions:[]

    };

    localStorage.setItem("melosaveUser",JSON.stringify(user));

    showNotification("🎉 Welcome to MeloSave, " + name + "!");

    setTimeout(()=>{

        location.href="login.html";

    },1800);

});


// ---------- Login ----------

const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const email = loginForm.querySelectorAll("input")[0].value.trim().toLowerCase();

    const password = loginForm.querySelectorAll("input")[1].value;

    const user = JSON.parse(localStorage.getItem("melosaveUser"));

    if(!user){

        showNotification("❌ No account found","#ff3b30");

        return;

    }

    if(email===user.email && password===user.password){

        localStorage.setItem("loggedIn","true");

        showNotification("👋 Welcome back, " + user.name);

        setTimeout(()=>{

            location.href="dashboard.html";

        },1800);

    }else{

        showNotification("❌ Incorrect email or password","#ff3b30");

    }

});


// ---------- Dashboard ----------

const greeting = document.getElementById("greeting");

const user = JSON.parse(localStorage.getItem("melosaveUser"));

if(greeting && user){

    const hour = new Date().getHours();

    let message="";

    if(hour<12){

        message="Good Morning";

    }else if(hour<17){

        message="Good Afternoon";

    }else{

        message="Good Evening";

    }

    greeting.innerHTML=`${message}, ${user.name} 👋`;

}


// ---------- Dashboard Numbers ----------

const balance=document.getElementById("balance");

const income=document.getElementById("income");

const expenses=document.getElementById("expenses");

const savings=document.getElementById("savings");

if(user){

    if(balance){

        balance.textContent="₦"+user.balance.toLocaleString();

        income.textContent="₦"+user.income.toLocaleString();

        expenses.textContent="₦"+user.expenses.toLocaleString();

        savings.textContent="₦"+user.savings.toLocaleString();

    }

}
// ==========================================
// PART 2 - SIGN UP
// ==========================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            showNotification("❌ Passwords do not match!");

            return;

        }

        const user = {
            name,
            email,
            password,
            balance: 0,
            income: 0,
            expenses: 0,
            savings: 0,
            transactions: []
        };

        saveUser(user);

        showNotification(`🎉 Welcome to MeloSave, ${name}!`);

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1800);

    });

            }
// ==========================================
// PART 3 - LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const user = getUser();

        if (!user) {

            showNotification("❌ No account found. Please create one first.");

            return;

        }

        if (email === user.email && password === user.password) {

            localStorage.setItem("loggedIn", "true");

            showNotification(`👋 Welcome back, ${user.name}!`);

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1800);

        } else {

            showNotification("❌ Incorrect email or password.");

        }

    });

}

// ==========================================
// PROTECT DASHBOARD & PROFILE
// ==========================================

const currentPage = window.location.pathname;

if (
    (currentPage.includes("dashboard.html") ||
     currentPage.includes("profile.html")) &&
    localStorage.getItem("loggedIn") !== "true"
) {

    window.location.href = "login.html";

}

// =====================================
// MELOSAVE PRO V2
// PART 2: MULTI-USER SIGNUP
// =====================================


// ================================
// CREATE ACCOUNT
// ================================

function createAccount(name, email, password) {


    // Remove extra spaces
    name = name.trim();
    email = email.trim().toLowerCase();
    password = password.trim();



    // Check empty fields

    if(name === "" || email === "" || password === "") {

        showNotification(
            "Please fill in all fields",
            "error"
        );

        return false;

    }



    // Get existing users

    let users = getUsers();



    // Check duplicate email

    const existingUser = users.find(
        user => user.email === email
    );


    if(existingUser){

        showNotification(
            "Email already exists",
            "error"
        );

        return false;

    }




    // Create new user

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        data: createDefaultData()

    };




    // Save user

    users.push(newUser);

    saveUsers(users);



    // Automatically login user

    saveCurrentUser(newUser);



    showNotification(
        "Account created successfully 🎉",
        "success"
    );



    return true;

}




// ================================
// SIGNUP FORM CONNECTION
// ================================


const signupForm = document.getElementById("signupForm");


if(signupForm){


    signupForm.addEventListener(
    "submit",
    function(e){


        e.preventDefault();



        const name =
        document.getElementById("signupName").value;


        const email =
        document.getElementById("signupEmail").value;


        const password =
        document.getElementById("signupPassword").value;



        const created =
        createAccount(
            name,
            email,
            password
        );



        if(created){

            // Change this later if your dashboard page name is different

            window.location.href = "dashboard.html";

        }


    });


}
if("serviceWorker" in navigator){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker.register(
"service-worker.js"
);

});

}
if ("serviceWorker" in navigator) {

    window.addEventListener(
    "load",
    ()=>{

        navigator.serviceWorker.register(
            "service-worker.js"
        );

    });

}
